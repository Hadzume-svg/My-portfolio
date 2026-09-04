// Бесплатный онлайн-перевод для пользовательского контента.
// Используем MyMemory (https://mymemory.translated.net) — бесплатный public API
// без ключа, с лимитом ~5000 символов/день по IP. Кэшируем результаты,
// чтобы не тратить лимит и не дёргать сеть на каждый рендер.

const CACHE_KEY = "portfolio-translations-v1";
const SRC = "ru";

async function fetchTranslation(text, target) {
  const url =
    "https://api.mymemory.translated.net/get?q=" +
    encodeURIComponent(text) +
    "&langpair=" +
    SRC +
    "|" +
    target;
  const res = await fetch(url);
  if (!res.ok) throw new Error("translate http " + res.status);
  const data = await res.json();
  // MyMemory возвращает текст в responseData.translatedText
  return data && data.responseData
    ? data.responseData.translatedText
    : null;
}

function loadCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {
    /* ignore */
  }
}

// Возвращает { get(text, target) } — синхронно отдаёт закэшированный перевод
// или исходный текст, и параллельно запрашивает перевод через колбэк onDone.
export function createTranslator() {
  const cache = loadCache();
  const get = (text, target) => {
    const key = text + "\u0001" + target;
    return cache[key] || null;
  };
  const request = async (text, target, onDone) => {
    const key = text + "\u0001" + target;
    if (cache[key]) return cache[key];
    if (!text) return text;
    try {
      const t = await fetchTranslation(text, target);
      if (t && t !== text) {
        cache[key] = t;
        saveCache(cache);
        onDone(t);
        return t;
      }
    } catch {
      /* offline — оставляем исходный текст */
    }
    return text;
  };
  return { get, request };
}
