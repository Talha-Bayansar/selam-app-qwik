import { component$, $ } from "@builder.io/qwik";
import type { SpeakLocale } from "qwik-speak";
import { useSpeakConfig } from "qwik-speak";
import { DropdownMenu } from "./dropdown-menu";

export const ChangeLocale = component$(() => {
  const config = useSpeakConfig();

  const changeLocale$ = $((newLocale: SpeakLocale) => {
    // Store locale in a cookie
    document.cookie = `locale=${JSON.stringify(
      newLocale,
    )};max-age=86400;path=/`;

    location.reload();
  });

  return (
    <DropdownMenu
      label={"Language"}
      items={config.supportedLocales.map((value) => (
        <button
          key={value.lang}
          class="px-4 py-2 text-sm text-gray-700"
          tabIndex={-1}
          onClick$={async () => await changeLocale$(value)}
        >
          {value.lang}
        </button>
      ))}
    />
  );
});
