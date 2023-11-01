import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import { qwikSpeakInline } from 'qwik-speak/inline';
import tsconfigPaths from "vite-tsconfig-paths";

const locales = {
  en: {
    lang: "en-US",
    currency: "USD",
    timeZone: "America/Los_Angeles",
  },
  tr: { lang: "tr-TR", currency: "TRY", timeZone: "Europe/Istanbul" },
  nl: { lang: "nl-BE", currency: "EUR", timeZone: "Europe/Brussels" },
};

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(), qwikSpeakInline({
      supportedLangs: [locales.en.lang, locales.nl.lang, locales.tr.lang],
      defaultLang: locales.tr.lang,
      assetsPath: 'i18n'
    }),],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: {
      include: [ "@auth/core" ]
    }
  };
});
