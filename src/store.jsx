import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import profileDefaults from "./data/profile.js";
import projectsDefaults from "./data/projects.js";
import { makeI18n, langHtml } from "./i18n.js";
import { createTranslator } from "./lib/translate.js";
import {
  fetchRemoteData,
  pushRemoteData,
  subscribeRealtime,
} from "./lib/backend.js";

const KEY = "portfolio-admin-v1";
const LANG_KEY = "portfolio-lang";

const clone = (o) => JSON.parse(JSON.stringify(o));

function currentData() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw);
      const ok =
        d &&
        d.profile &&
        d.projects &&
        Array.isArray(d.profile.stack) &&
        d.profile.stack.length > 0;
      if (ok) return d;
    }
  } catch {
    /* ignore */
  }
  const fresh = {
    profile: clone(profileDefaults),
    projects: clone(projectsDefaults),
  };
  try {
    localStorage.setItem(KEY, JSON.stringify(fresh));
  } catch {
    /* ignore */
  }
  return fresh;
}

function cache(next) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

function isInitialized(payload) {
  return (
    payload &&
    payload.profile &&
    Array.isArray(payload.profile.stack) &&
    payload.profile.stack.length > 0
  );
}

function normalize(payload) {
  const profile = payload && payload.profile
    ? {
        ...profileDefaults,
        ...payload.profile,
        links: {
          ...profileDefaults.links,
          ...(payload.profile.links || {}),
        },
      }
    : clone(profileDefaults);
  const projects =
    payload && Array.isArray(payload.projects)
      ? payload.projects.map((p) => ({
          ...p,
          category: p.category === "design" ? "apps" : p.category || "apps",
          featured: p.featured === true,
        }))
      : clone(projectsDefaults);
  return { profile, projects };
}

const Ctx = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(currentData);
  const dataRef = useRef(data);
  const [lang, setLangState] = useState(
    () => localStorage.getItem(LANG_KEY) || "ru"
  );
  // Онлайн-переводы пользовательского контента (названия/описания проектов).
  const [tx, setTx] = useState({});
  const translator = useRef(null);
  if (!translator.current) translator.current = createTranslator();
  const { t, tr } = makeI18n(lang);

  const translate = useCallback(
    (text) => {
      if (!text || typeof text !== "string") return text;
      const base = tr(text); // словарь (дефолтные строки)
      if (base !== text) return base;
      // Пользовательский контент — онлайн-перевод (кэш → запрос)
      if (lang === "ru") return text;
      const cached = translator.current.get(text, lang);
      if (cached) return cached;
      translator.current.request(text, lang, (val) => {
        setTx((prev) => ({ ...prev, [text + lang]: val }));
      });
      return text;
    },
    [tr, lang]
  );

  useEffect(() => {
    document.documentElement.lang = langHtml(lang);
  }, [lang]);

  const setLang = useCallback((code) => {
    setLangState(code);
    try {
      localStorage.setItem(LANG_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Подключаемся к облачной базе: подтягиваем актуальные данные и слушаем
  // изменения в реальном времени, чтобы сайт обновлялся у всех.
  useEffect(() => {
    let alive = true;
    let unsub = null;

    (async () => {
      const remote = await fetchRemoteData();
      if (!alive) return;
      if (remote && isInitialized(remote)) {
        const norm = normalize(remote);
        setData(norm);
        dataRef.current = norm;
        cache(norm);
      }
      unsub = subscribeRealtime((payload) => {
        if (!alive) return;
        const norm = normalize(payload);
        setData(norm);
        dataRef.current = norm;
        cache(norm);
      });
    })();

    return () => {
      alive = false;
      if (unsub) unsub();
    };
  }, []);

  const commit = useCallback((next) => {
    setData(next);
    dataRef.current = next;
    cache(next);
    pushRemoteData(next).catch(() => {
      /* no session or offline — изменения остаются локальными */
    });
  }, []);

  const setProfile = useCallback(
    (patch) => {
      const next = {
        ...dataRef.current,
        profile: { ...dataRef.current.profile, ...patch },
      };
      commit(next);
    },
    [commit]
  );

  const setProjects = useCallback(
    (projects) => {
      const next = { ...dataRef.current, projects };
      commit(next);
    },
    [commit]
  );

  const reset = useCallback(() => {
    const next = {
      profile: clone(profileDefaults),
      projects: clone(projectsDefaults),
    };
    commit(next);
  }, [commit]);

  return (
    <Ctx.Provider
      value={{ data, setProfile, setProjects, reset, lang, setLang, t, tr: translate, tx }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function usePortfolio() {
  return useContext(Ctx);
}