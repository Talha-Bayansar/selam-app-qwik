import { component$, $ } from "@builder.io/qwik";
import {
  Speak,
  useSpeakConfig,
  useTranslate,
  useSpeakLocale,
} from "qwik-speak";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";
import { ElevatedButton, Page, SelectField } from "~/shared";
import { routes } from "~/utils";

const Settings = component$(() => {
  const t = useTranslate();
  const session = useAuthSession();
  const signOut = useAuthSignout();
  const config = useSpeakConfig();
  const speakLocale = useSpeakLocale();

  const changeLocale$ = $((newLocaleJson: string) => {
    // Store locale in a cookie
    document.cookie = `locale=${newLocaleJson};max-age=86400;path=/`;

    location.reload();
  });

  const confirmText = t(
    "app.signOutConfirmation@@Are you sure you want to sign out?",
  );

  const handleSignOut = $(() => {
    const isConfirmed = confirm(confirmText);
    if (isConfirmed) {
      signOut.submit({ callbackUrl: routes.signIn });
    }
  });

  return (
    <Page class="relative pb-8" title={t("settings.title@@Settings")}>
      <div class="flex flex-col gap-8">
        <h2>{session.value?.user?.name}</h2>
        <div class="flex flex-col gap-8 md:max-w-lg">
          <SelectField
            label={t("settings.language@@Language")}
            onChange$={async (e) => await changeLocale$(e.target.value)}
          >
            {config.supportedLocales.map((locale) => (
              <option
                key={locale.lang}
                selected={locale.lang === speakLocale.lang}
                value={JSON.stringify(locale)}
              >
                {locale.lang}
              </option>
            ))}
          </SelectField>
          <ElevatedButton
            class="bg-red-600 shadow-red"
            onClick$={handleSignOut}
          >
            {t("app.signOut@@Sign out")}
          </ElevatedButton>
        </div>
      </div>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["settings"]}>
      <Settings />
    </Speak>
  );
});

//TODO: add meta data
