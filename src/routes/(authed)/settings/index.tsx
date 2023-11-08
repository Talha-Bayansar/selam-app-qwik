import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { useAuthSession, useAuthSignout } from "~/routes/plugin@auth";
import { AnimatedButton, Page } from "~/shared";
import { routes } from "~/utils";

const Members = component$(() => {
  const t = useTranslate();
  const session = useAuthSession();
  const signOut = useAuthSignout();
  return (
    <Page class="relative pb-8" title={t("settings.title@@Settings")}>
      <h2>{session.value?.user?.name}</h2>
      <Form action={signOut}>
        <input type="hidden" name="callbackUrl" value={routes.root} />
        <AnimatedButton
          class="rounded-lg bg-red-500 py-2 text-white"
          type="submit"
        >
          {t("settings.signOut@@Sign out")}
        </AnimatedButton>
      </Form>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["settings"]}>
      <Members />
    </Speak>
  );
});

//TODO: add meta data
