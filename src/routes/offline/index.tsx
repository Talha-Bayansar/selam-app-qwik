import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { ElevatedButton, Page } from "~/shared";

export const Offline = component$(() => {
  const t = useTranslate();

  return (
    <Page class="gap-4 md:max-w-lg" title={t("offline.oops@@Oops!")}>
      <p>{t("offline.description@@It looks like you are offline.")}</p>
      <Link reload>
        <ElevatedButton>{t("offline.retry@@Retry")}</ElevatedButton>
      </Link>
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
