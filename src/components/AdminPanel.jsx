import { useEffect, useRef, useState } from "react";
import { usePortfolio, ADMIN_PASSCODE } from "../store.jsx";
import {
  signIn,
  signOut,
  isSignedIn,
  uploadImage,
} from "../lib/backend.js";
import { SITE_ADMIN_EMAIL, supabaseConfigured } from "../config.js";
import profileDefaults from "../data/profile.js";
import projectsDefaults from "../data/projects.js";

const clone = (o) => JSON.parse(JSON.stringify(o));

export default function AdminPanel() {
  const [active, setActive] = useState(() => window.location.hash === "#admin");
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState(SITE_ADMIN_EMAIL);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const backendOn = supabaseConfigured();

  useEffect(() => {
    const onHash = () => {
      const isActive = window.location.hash === "#admin";
      setActive(isActive);
      if (isActive && supabaseConfigured()) {
        isSignedIn().then(setAuthed);
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (!active) return null;

  const close = () => {
    history.replaceState(null, "", window.location.pathname);
    setActive(false);
  };

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    setErr(false);
    if (backendOn) {
      const { error } = await signIn(email, pwd);
      if (error) {
        setErr(true);
        setBusy(false);
        return;
      }
      setAuthed(true);
    } else if (pwd === ADMIN_PASSCODE) {
      setAuthed(true);
    } else {
      setErr(true);
      setBusy(false);
      return;
    }
    setPwd("");
    setBusy(false);
  };

  const logout = async () => {
    if (backendOn) await signOut();
    setAuthed(false);
  };

  return (
    <div className="admin-overlay">
      <div className="admin-box">
        {authed ? (
          <Admin onClose={close} onLogout={logout} />
        ) : (
          <form className="admin-login" onSubmit={login}>
            <h2>Админ-доступ</h2>
            {backendOn ? (
              <p className="admin-login-note mono">
                Войди через свой email в Supabase, чтобы редактировать данные.
              </p>
            ) : (
              <p className="admin-login-note mono">
                База не настроена — правки сохраняются только в этом браузере.
              </p>
            )}
            {backendOn && (
              <div className="admin-field">
                <input
                  className="admin-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            )}
            <div className="admin-field">
              <input
                className="admin-input"
                type="password"
                placeholder="Пароль"
                value={pwd}
                onChange={(e) => {
                  setPwd(e.target.value);
                  setErr(false);
                }}
                autoFocus={!backendOn}
              />
            </div>
            {err && (
              <p className="admin-err">
                {backendOn ? "Неверный email или пароль" : "Неверный пароль"}
              </p>
            )}
            <button className="admin-btn primary" type="submit" disabled={busy}>
              {busy ? "Вхожу…" : "Войти"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Admin({ onClose, onLogout }) {
  const { data, setProfile, setProjects, reset } = usePortfolio();
  const [tab, setTab] = useState("works");
  const [profDraft, setProfDraft] = useState(() => clone(data.profile));
  const [projDraft, setProjDraft] = useState(() => clone(data.projects));
  const [newChip, setNewChip] = useState("");
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [projFilter, setProjFilter] = useState("all");
  const backendOn = supabaseConfigured();
  const dirty = useRef(false);
  const categories = profDraft.categories || [];

  const filteredProjects =
    projFilter === "all"
      ? projDraft
      : projDraft.filter((p) => p.category === projFilter);

  // Пока администратор не начал править, дотягиваем черновики до последних
  // данных из облака (иначе на новом устройстве черновики на миг показывают
  // дефолты и сохранением можно затереть настоящие данные).
  useEffect(() => {
    if (dirty.current) return;
    setProfDraft(clone(data.profile));
    setProjDraft(clone(data.projects));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const markDirty = () => {
    dirty.current = true;
  };

  const updProf = (field, value) => {
    markDirty();
    setProfDraft((d) => ({ ...d, [field]: value }));
  };

  const saveProfile = () => {
    setProfile(profDraft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const saveProjects = () => {
    setProjects(projDraft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const updProj = (id, field, value) => {
    markDirty();
    setProjDraft((p) => p.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  };

  const addProj = () => {
    markDirty();
    setProjDraft((p) => [
      {
        id: Date.now(),
        category: "frontend",
        categoryLabel: "Front-end · новый проект",
        title: "Новый проект",
        description: "Короткое описание задачи и результата.",
        image: null,
        link: "#",
        linkLabel: "Смотреть демо",
        featured: false,
      },
      ...p,
    ]);
  };

  const delProj = (id) => {
    markDirty();
    setProjDraft((p) => p.filter((x) => x.id !== id));
  };

  const addChip = () => {
    const v = newChip.trim();
    if (!v) return;
    markDirty();
    setProfDraft((d) => ({ ...d, stack: [...d.stack, v] }));
    setNewChip("");
  };

  const delChip = (idx) => {
    markDirty();
    setProfDraft((d) => ({ ...d, stack: d.stack.filter((_, k) => k !== idx) }));
  };

  const handleUpload = async (id, e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(id);
    const res = await uploadImage(file);
    setUploading(null);
    e.target.value = "";
    if (res.error) {
      window.alert("Не удалось загрузить: " + res.error);
      return;
    }
    updProj(id, "image", res.url);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploadingPhoto(true);
    const res = await uploadImage(file);
    setUploadingPhoto(false);
    e.target.value = "";
    if (res.error) {
      window.alert("Не удалось загрузить: " + res.error);
      return;
    }
    updProf("photo", res.url);
  };

  const renameCat = (key, label) => {
    markDirty();
    setProfDraft((d) => ({
      ...d,
      categories: d.categories.map((c) =>
        c.key === key ? { ...c, label } : c
      ),
    }));
  };

  const moveCat = (i, dir) => {
    const j = i + dir;
    if (!profDraft.categories || j < 0 || j >= profDraft.categories.length) return;
    const next = profDraft.categories.slice();
    const [item] = next.splice(i, 1);
    next.splice(j, 0, item);
    markDirty();
    setProfDraft((d) => ({ ...d, categories: next }));
  };

  const doReset = () => {
    if (!window.confirm("Сбросить все изменения к заводским настройкам?")) return;
    reset();
    setProfDraft(clone(profileDefaults));
    setProjDraft(clone(projectsDefaults));
  };

  return (
    <>
      <div className="admin-head">
        <h2>Админ-панель</h2>
        <div className="admin-actions">
          <div className="admin-tabs">
            <button
              className={"admin-tab" + (tab === "works" ? " active" : "")}
              onClick={() => setTab("works")}
            >
              Работы
            </button>
            <button
              className={"admin-tab" + (tab === "profile" ? " active" : "")}
              onClick={() => setTab("profile")}
            >
              Профиль
            </button>
          </div>
          <button className="admin-btn ghost" onClick={onLogout}>
            Выйти
          </button>
          <button className="admin-btn ghost" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>

      {!backendOn && (
        <p className="admin-warn">
          ⚠ База Supabase не настроена — правки видны только в этом браузере.
          Настрой в src/config.js.
        </p>
      )}

      {saved ? <p className="admin-saved">✓ Сохранено и отправлено на сайт</p> : null}

      {tab === "works" ? (
        <div>
          <div className="admin-actions">
            <button className="admin-btn primary" onClick={addProj}>
              + Добавить работу
            </button>
            <button className="admin-btn" onClick={saveProjects}>
              Сохранить все
            </button>
          </div>

          <div className="admin-filters">
            <button
              className={"admin-tab" + (projFilter === "all" ? " active" : "")}
              onClick={() => setProjFilter("all")}
            >
              Все
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                className={"admin-tab" + (projFilter === c.key ? " active" : "")}
                onClick={() => setProjFilter(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="admin-hint mono">
            На сайте показываются только избранные: до 6 работ, до 2 из каждой
            категории.
          </p>

          {filteredProjects.map((p) => (
            <div className="admin-proj" key={p.id}>
              <div className="admin-proj-head">
                <span className="admin-proj-ix mono">#{p.id}</span>
                <div className="admin-proj-head-btns">
                  <button
                    className={"admin-btn" + (p.featured ? " featured" : "")}
                    onClick={() => updProj(p.id, "featured", !p.featured)}
                  >
                    {p.featured ? "★ Избранная" : "☆ Не избранная"}
                  </button>
                  <button
                    className="admin-btn danger"
                    onClick={() => delProj(p.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <div className="admin-grid">
                <div className="admin-field">
                  <label>Название</label>
                  <input
                    className="admin-input"
                    value={p.title}
                    onChange={(e) => updProj(p.id, "title", e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label>Категория</label>
                  <select
                    className="admin-select"
                    value={p.category}
                    onChange={(e) => updProj(p.id, "category", e.target.value)}
                  >
                    {categories.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="admin-field">
                  <label>Подпись категории (строка)</label>
                  <input
                    className="admin-input"
                    value={p.categoryLabel}
                    onChange={(e) => updProj(p.id, "categoryLabel", e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label>Ссылка (URL)</label>
                  <input
                    className="admin-input"
                    value={p.link}
                    onChange={(e) => updProj(p.id, "link", e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label>Текст кнопки</label>
                  <input
                    className="admin-input"
                    value={p.linkLabel}
                    onChange={(e) => updProj(p.id, "linkLabel", e.target.value)}
                  />
                </div>
                <div className="admin-field">
                  <label>Картинка</label>
                  <input
                    className="admin-input"
                    value={p.image || ""}
                    placeholder="URL или путь вида /projects/name.png"
                    onChange={(e) =>
                      updProj(p.id, "image", e.target.value.trim() || null)
                    }
                  />
                  <div className="admin-add-row">
                    <label className="admin-btn upload">
                      {uploading === p.id ? "Загрузка…" : "↑ Загрузить файл"}
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => handleUpload(p.id, e)}
                      />
                    </label>
                  </div>
                </div>
                <div className="admin-field admin-full">
                  <label>Описание</label>
                  <textarea
                    className="admin-textarea"
                    rows="2"
                    value={p.description}
                    onChange={(e) => updProj(p.id, "description", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <p className="admin-empty">
              В этой категории пока нет работ — добавь первую или переключи фильтр.
            </p>
          )}
        </div>
      ) : (
        <div>
          <div className="admin-grid">
            <div className="admin-field admin-full">
              <label>Фото (о фрилансере)</label>
              <input
                className="admin-input"
                value={profDraft.photo || ""}
                placeholder="/photo.jpg или URL"
                onChange={(e) => updProf("photo", e.target.value)}
              />
              <div className="admin-add-row">
                <label className="admin-btn upload">
                  {uploadingPhoto ? "Загрузка…" : "↑ Загрузить файл"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            </div>
            <div className="admin-field">
              <label>Статус</label>
              <input
                className="admin-input"
                value={profDraft.status}
                onChange={(e) => updProf("status", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Опыт</label>
              <input
                className="admin-input"
                value={profDraft.experience}
                onChange={(e) => updProf("experience", e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label>Активные проекты (число)</label>
              <input
                className="admin-input"
                type="number"
                min="0"
                value={profDraft.activeProjects}
                onChange={(e) =>
                  updProf("activeProjects", Number(e.target.value))
                }
              />
            </div>
            <div className="admin-field">
              <label>Время ответа</label>
              <input
                className="admin-input"
                value={profDraft.answerTime}
                onChange={(e) => updProf("answerTime", e.target.value)}
              />
            </div>
          </div>

          <div className="admin-field">
            <label>Категории работ (порядок = приоритет на сайте; можно переименовывать)</label>
            {categories.map((c, i) => (
              <div className="admin-cat-row" key={c.key}>
                <span className="admin-cat-key mono">{c.key}</span>
                <input
                  className="admin-input"
                  value={c.label}
                  onChange={(e) => renameCat(c.key, e.target.value)}
                />
                <div className="admin-cat-arrows">
                  <button
                    className="admin-btn small"
                    disabled={i === 0}
                    onClick={() => moveCat(i, -1)}
                  >
                    ↑
                  </button>
                  <button
                    className="admin-btn small"
                    disabled={i === categories.length - 1}
                    onClick={() => moveCat(i, 1)}
                  >
                    ↓
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-field">
            <label>Стек и языки</label>
            <div className="admin-chips">
              {profDraft.stack.map((s, i) => (
                <span className="admin-chip" key={`${s}-${i}`}>
                  {s}
                  <button type="button" onClick={() => delChip(i)}>
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="admin-add-row">
              <input
                className="admin-input"
                placeholder="Например: Vue.js"
                value={newChip}
                onChange={(e) => setNewChip(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip();
                  }
                }}
              />
              <button className="admin-btn" onClick={addChip}>
                Добавить
              </button>
            </div>
          </div>

          <div className="admin-grid">
            <div className="admin-field">
              <label>Telegram (ссылка)</label>
              <input
                className="admin-input"
                placeholder="https://t.me/..."
                value={profDraft.links.telegram}
                onChange={(e) =>
                  updProf("links", { ...profDraft.links, telegram: e.target.value })
                }
              />
            </div>
            <div className="admin-field">
              <label>GitHub (ссылка)</label>
              <input
                className="admin-input"
                placeholder="https://github.com/..."
                value={profDraft.links.github}
                onChange={(e) =>
                  updProf("links", { ...profDraft.links, github: e.target.value })
                }
              />
            </div>
            <div className="admin-field">
              <label>Instagram (ссылка)</label>
              <input
                className="admin-input"
                placeholder="https://instagram.com/..."
                value={profDraft.links.instagram}
                onChange={(e) =>
                  updProf("links", { ...profDraft.links, instagram: e.target.value })
                }
              />
            </div>
            <div className="admin-field">
              <label>Discord (юзернейм)</label>
              <input
                className="admin-input"
                placeholder="например: hadzyme"
                value={profDraft.links.discord}
                onChange={(e) =>
                  updProf("links", { ...profDraft.links, discord: e.target.value })
                }
              />
            </div>
          </div>

          <div className="admin-actions">
            <button className="admin-btn primary" onClick={saveProfile}>
              Сохранить
            </button>
          </div>
        </div>
      )}

      <div className="admin-actions admin-divider">
        <button className="admin-btn danger" onClick={doReset}>
          Сбросить к заводским
        </button>
      </div>
    </>
  );
}