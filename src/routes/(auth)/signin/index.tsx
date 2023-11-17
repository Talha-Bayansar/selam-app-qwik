import { component$ } from "@builder.io/qwik";
import { Form, useLocation } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { useAuthSignin } from "~/routes/plugin@auth";
import { AnimatedButton, Page } from "~/shared";
import { routes } from "~/utils";

export const SignIn = component$(() => {
  const signIn = useAuthSignin();
  const t = useTranslate();
  const loc = useLocation();

  return (
    <Page
      class="grid h-full grow place-items-center"
      title={t("auth.welcomeToSelam@@Welcome to Selam")}
    >
      <Form class="w-full md:max-w-lg" action={signIn}>
        <input type="hidden" name="providerId" value="google" />
        <input
          type="hidden"
          name="options.callbackUrl"
          value={loc.url.searchParams.get("callbackUrl") ?? routes.root}
        />
        <AnimatedButton
          class="rounded-lg bg-primary p-2 text-white shadow-dark"
          animation={{
            scale: true,
            shadow: true,
          }}
        >
          {t("auth.signIn@@Sign in")}
        </AnimatedButton>
      </Form>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["auth"]}>
      <SignIn />
    </Speak>
  );
});

//TODO: add meta data
