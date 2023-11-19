import { $, component$ } from "@builder.io/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { useAuthSignout } from "~/routes/plugin@auth";
import { ElevatedButton, Page } from "~/shared";
import { routes } from "~/utils";

export const NoAccess = component$(() => {
  const t = useTranslate();
  const signOut = useAuthSignout();

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
    <div class="min-h-screen p-8">
      <Page class="gap-4 md:max-w-lg" title={t("noAccess.title@@No access")}>
        <p>
          {t(
            "noAccess.description@@It looks like you don't have access to any organisations.",
          )}
        </p>
        <ElevatedButton class="bg-red-600 shadow-red" onClick$={handleSignOut}>
          {t("app.signOut@@Sign out")}
        </ElevatedButton>
      </Page>
    </div>
  );
});

export default component$(() => {
  return (
    <Speak assets={["noAccess"]}>
      <NoAccess />
    </Speak>
  );
});

//TODO: add meta data
