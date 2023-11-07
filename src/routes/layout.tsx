import { component$, type JSXChildren, Slot } from "@builder.io/qwik";
// import { routeLoader$ } from "@builder.io/qwik-city";
import { Link, type RequestHandler } from "@builder.io/qwik-city";
import { useTranslate } from "qwik-speak";
import {
  AnimatedButton,
  MaterialSymbolsGridViewRounded,
  MaterialSymbolsSettingsRounded,
} from "~/shared";
import { routes } from "~/utils";

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

// export const useServerTimeLoader = routeLoader$(() => {
//   return {
//     date: new Date().toISOString(),
//   };
// });

interface NavItem {
  name: string;
  icon: JSXChildren;
  href: string;
}

export default component$(() => {
  const t = useTranslate();
  const navItems: NavItem[] = [
    {
      name: t("app.apps@@Apps"),
      href: routes.root,
      icon: <MaterialSymbolsGridViewRounded size={28} />,
    },
    {
      name: t("app.settings@@Settings"),
      href: routes.root,
      icon: <MaterialSymbolsSettingsRounded size={28} />,
    },
  ];
  return (
    <div class="flex min-h-screen w-screen flex-col">
      <main class="flex-grow p-8">
        <Slot />
      </main>
      <footer class="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-white from-80% to-transparent py-4">
        <nav class="flex w-full justify-evenly">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              class="grid flex-grow place-items-center py-4"
            >
              <AnimatedButton
                animation={{ scale: true }}
                class="grid place-items-center"
              >
                {item.icon}
              </AnimatedButton>
            </Link>
          ))}
        </nav>
      </footer>
    </div>
  );
});
