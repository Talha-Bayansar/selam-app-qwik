import { component$ } from "@builder.io/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { Page } from "~/shared";

export const Offline = component$(() => {
  const t = useTranslate();
  return (
    <Page title={t("offline.oops@@Oops!")}>
      <p>{t("offline.description@@It looks like you are offline.")}</p>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["offline"]}>
      <div class="p-8">
        <Offline />
      </div>
    </Speak>
  );
});
