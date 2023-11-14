import { component$, $ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import {
  Speak,
  type SpeakLocale,
  useSpeakConfig,
  useTranslate,
  useSpeakLocale,
} from "qwik-speak";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";
import { AnimatedButton, Page, SelectField } from "~/shared";
import { routes } from "~/utils";

const Settings = component$(() => {
  const t = useTranslate();
  const session = useAuthSession();
  const signOut = useAuthSignout();
  const config = useSpeakConfig();
  const speakLocale = useSpeakLocale();
  const loc = useLocation();

  // Replace the locale and navigate to the new URL
  const navigateByLocale$ = $((newLocaleJson: string) => {
    const newLocale = JSON.parse(newLocaleJson) as SpeakLocale;
    const url = new URL(location.href);
    if (loc.params.lang) {
      if (newLocale.lang !== config.defaultLocale.lang) {
        url.pathname = url.pathname.replace(loc.params.lang, newLocale.lang);
      } else {
        url.pathname = url.pathname.replace(
          new RegExp(`(/${loc.params.lang}/)|(/${loc.params.lang}$)`),
          "/",
        );
      }
    } else if (newLocale.lang !== config.defaultLocale.lang) {
      url.pathname = `/${newLocale.lang}${url.pathname}`;
    }

    location.href = url.toString();
  });

  return (
    <Page class="relative pb-8" title={t("settings.title@@Settings")}>
      <div class="flex flex-col gap-8">
        <h2>{session.value?.user?.name}</h2>
        <div class="flex flex-col gap-8 md:max-w-lg">
          <SelectField
            label={t("settings.language@@Language")}
            onChange$={async (e) => await navigateByLocale$(e.target.value)}
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
          <Form action={signOut}>
            <input type="hidden" name="callbackUrl" value={routes.root} />
            <AnimatedButton
              class="rounded-lg bg-red-500 py-2 text-white"
              type="submit"
            >
              {t("settings.signOut@@Sign out")}
            </AnimatedButton>
          </Form>
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
