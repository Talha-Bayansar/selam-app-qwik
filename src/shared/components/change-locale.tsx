import { component$, $ } from "@builder.io/qwik";
import type { SpeakLocale } from "qwik-speak";
import { useSpeakConfig, useTranslate } from "qwik-speak";

export const ChangeLocale = component$(() => {
  const t = useTranslate();

  const config = useSpeakConfig();

  const changeLocale$ = $((newLocale: SpeakLocale) => {
    // Store locale in a cookie
    document.cookie = `locale=${JSON.stringify(
      newLocale,
    )};max-age=86400;path=/`;

    location.reload();
  });

  return (
    <div>
      <h2>{t("app.changeLocale@@Change locale")}</h2>
      {config.supportedLocales.map((value) => (
        <button
          key={value.lang}
          onClick$={async () => await changeLocale$(value)}
        >
          {value.lang}
        </button>
      ))}
    </div>
  );
});
