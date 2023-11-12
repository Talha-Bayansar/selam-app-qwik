import { type Session } from "@auth/core/types";
import { component$, type JSXChildren, Slot } from "@builder.io/qwik";
import { Link, useLocation, type RequestHandler } from "@builder.io/qwik-city";
import { useTranslate } from "qwik-speak";
import { twMerge } from "tailwind-merge";
import {
  AnimatedButton,
  MaterialSymbolsGridViewRounded,
  MaterialSymbolsSettingsRounded,
} from "~/shared";
import { primaryColor, routes, secondaryColor } from "~/utils";

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get("session");
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(
      302,
      `${routes.signIn}?callbackUrl=${event.url.pathname}`,
    );
  }
};

interface NavItem {
  name: string;
  icon: JSXChildren;
  href: string;
}

export default component$(() => {
  const t = useTranslate();
  const location = useLocation();
  const navItems: NavItem[] = [
    {
      name: t("app.apps@@Apps"),
      href: routes.root,
      icon: (
        <MaterialSymbolsGridViewRounded
          color={
            location.url.pathname === routes.root
              ? primaryColor
              : secondaryColor
          }
          size={28}
        />
      ),
    },
    {
      name: t("app.settings@@Settings"),
      href: `${routes.settings}/`,
      icon: (
        <MaterialSymbolsSettingsRounded
          color={
            location.url.pathname === `${routes.settings}/`
              ? primaryColor
              : secondaryColor
          }
          size={28}
        />
      ),
    },
  ];

  return (
    <div class="flex min-h-screen w-screen flex-col md:flex-row-reverse">
      <main class="flex flex-grow flex-col p-8">
        <Slot />
      </main>
      <nav class="md:shadow-light sticky bottom-0 left-0 right-0 flex justify-evenly bg-gradient-to-t from-white from-80% to-transparent py-4 md:flex-col md:justify-start md:gap-4 md:px-4 md:py-6">
        {navItems.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              class={twMerge(
                "md:hover:bg-secondary-transparent-30 grid flex-grow place-items-center py-4 md:flex-grow-0 md:rounded-full md:p-4",
              )}
              title={item.name}
            >
              <AnimatedButton
                animation={{ scale: true }}
                class="grid place-items-center"
              >
                {item.icon}
              </AnimatedButton>
            </Link>
          );
        })}
      </nav>
    </div>
  );
});
