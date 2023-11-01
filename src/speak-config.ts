import type { SpeakConfig } from "qwik-speak";

const locales = {
  en: {
    lang: "en-US",
    currency: "USD",
    // timeZone: "America/Los_Angeles",
  },
  tr: {
    lang: "tr-TR",
    currency: "TRY",
    // timeZone: "Europe/Istanbul"
  },
  nl: {
    lang: "nl-BE",
    currency: "EUR",
    // timeZone: "Europe/Brussels"
  },
};

export const config: SpeakConfig = {
  defaultLocale: locales.tr,
  supportedLocales: [locales.en, locales.nl, locales.tr],
  assets: [
    "app", // Translations shared by the pages
  ],
  runtimeAssets: [
    "runtime", // Translations with dynamic keys or parameters
  ],
};
