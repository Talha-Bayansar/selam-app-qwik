import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import { ChangeLocale } from "~/shared";
import { useAuthSession, useAuthSignin, useAuthSignout } from "./plugin@auth";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const signIn = useAuthSignin();
  const signOut = useAuthSignout();
  const session = useAuthSession();
  return (
    <div class="flex flex-col">
      <header class="flex w-full items-center justify-between p-4 shadow-md">
        <h1>
          Selam{session.value?.user && <span>: {session.value.user.name}</span>}
        </h1>
        <div class="flex gap-2">
          <ChangeLocale />
          <button
            class="px-2 py-1"
            onClick$={() =>
              session.value?.user
                ? signOut.submit({ callbackUrl: "/" })
                : signIn.submit({
                    providerId: "google",
                    options: { callbackUrl: location.href },
                  })
            }
          >
            Auth
          </button>
        </div>
      </header>
      <main>
        <Slot />
      </main>
    </div>
  );
});
