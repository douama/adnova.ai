import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../locales/en.json";
import fr from "../locales/fr.json";
import es from "../locales/es.json";
import pt from "../locales/pt.json";
import ru from "../locales/ru.json";
import de from "../locales/de.json";

export const SUPPORTED_LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
] as const;

const SUPPORTED_CODES = SUPPORTED_LANGS.map((l) => l.code);

// Country (ISO 3166-1 alpha-2) → preferred app language.
// Covers the major markets in each language family ; anything not listed
// falls back to English.
const COUNTRY_TO_LANG: Record<string, string> = {
  // French
  FR: "fr", BE: "fr", CH: "fr", LU: "fr", MC: "fr", CA: "fr",
  CI: "fr", SN: "fr", CM: "fr", DZ: "fr", MA: "fr", TN: "fr",
  // Spanish
  ES: "es", MX: "es", AR: "es", CO: "es", CL: "es", PE: "es",
  VE: "es", EC: "es", GT: "es", CU: "es", BO: "es", DO: "es",
  HN: "es", PY: "es", SV: "es", NI: "es", CR: "es", PA: "es",
  UY: "es", PR: "es",
  // Portuguese
  PT: "pt", BR: "pt", AO: "pt", MZ: "pt", CV: "pt",
  // German
  DE: "de", AT: "de", LI: "de",
  // Russian (+ Russophone CIS)
  RU: "ru", BY: "ru", KZ: "ru", KG: "ru", UA: "ru", AM: "ru",
  AZ: "ru", MD: "ru", TJ: "ru", TM: "ru", UZ: "ru",
};

// Lightweight cache so we don't hit ipapi.co on every page nav.
const COUNTRY_CACHE_KEY = "adnova:country";

async function detectCountry(): Promise<string | null> {
  try {
    const cached = localStorage.getItem(COUNTRY_CACHE_KEY);
    if (cached && /^[A-Z]{2}$/.test(cached)) return cached;
  } catch (_) { /* ignore */ }

  // 800 ms timeout — if the IP service is slow we just fall through
  // to navigator.language so users never wait on first paint.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 800);
  try {
    const res = await fetch("https://ipapi.co/country/", {
      signal: controller.signal,
      cache: "force-cache",
    });
    if (!res.ok) return null;
    const text = (await res.text()).trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(text)) return null;
    try { localStorage.setItem(COUNTRY_CACHE_KEY, text); } catch (_) { /* ignore */ }
    return text;
  } catch (_) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Resolves the best initial language given browser + IP signals.
// Priority:
//   1. localStorage adnova:lang (user pick, never override)
//   2. navigator.language[0..2] if in SUPPORTED_CODES
//   3. geo-IP country → COUNTRY_TO_LANG mapping
//   4. "en" fallback
async function resolveInitialLang(): Promise<string> {
  try {
    const stored = localStorage.getItem("adnova:lang");
    if (stored && SUPPORTED_CODES.includes(stored as never)) return stored;
  } catch (_) { /* ignore */ }

  if (typeof navigator !== "undefined" && navigator.language) {
    const short = navigator.language.slice(0, 2).toLowerCase();
    if (SUPPORTED_CODES.includes(short as never)) return short;
  }

  const country = await detectCountry();
  if (country && COUNTRY_TO_LANG[country]) return COUNTRY_TO_LANG[country];

  return "en";
}

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt },
      de: { translation: de },
      ru: { translation: ru },
    },
    fallbackLng: "en",
    supportedLngs: SUPPORTED_CODES,
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "adnova:lang",
    },
  });

// Run the geo-IP detection in the background. If the resolved language is
// different from what i18next picked AND the user hasn't manually chosen
// one yet, switch.
void resolveInitialLang().then((lang) => {
  if (!lang) return;
  const stored = (() => {
    try { return localStorage.getItem("adnova:lang"); } catch (_) { return null; }
  })();
  if (stored) return; // user already picked one
  if (i18n.resolvedLanguage !== lang) {
    void i18n.changeLanguage(lang);
  }
});

export default i18n;
