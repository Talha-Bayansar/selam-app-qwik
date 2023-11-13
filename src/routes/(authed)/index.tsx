import { type JSXChildren, component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import {
  AnimatedButton,
  MaterialSymbolsGroupsSharp,
  MaterialSymbolsPerson,
  Page,
} from "~/shared";
import { primaryColor, routes } from "~/utils";

interface App {
  name: string;
  icon: JSXChildren;
  href: string;
}

export const Apps = component$(() => {
  const t = useTranslate();
  const apps: App[] = [
    {
      name: t("root.apps.members@@Members"),
      icon: <MaterialSymbolsPerson size={36} color={primaryColor} />,
      href: routes.members,
    },
    {
      name: t("root.apps.groups@@Groups"),
      icon: <MaterialSymbolsGroupsSharp size={36} color={primaryColor} />,
      href: routes.groups,
    },
  ];

  return (
    <Page title={t("root.title@@Apps")}>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        {apps.map((app) => (
          <Link key={app.name} href={app.href}>
            <AnimatedButton
              animation={{
                scale: true,
                shadow: true,
              }}
              class="shadow-dark flex flex-col items-center justify-center rounded-lg p-4"
            >
              {app.icon}
              {app.name}
            </AnimatedButton>
          </Link>
        ))}
      </div>
    </Page>
  );
});

export default component$(() => {
  return (
    /**
     * Add Root translations (only available in child components)
     */
    <Speak assets={["root"]}>
      <Apps />
    </Speak>
  );
});

export const head: DocumentHead = {
  title: "runtime.root.head.title@@Selam | Apps",
  meta: [
    {
      name: "description",
      content: "runtime.root.head.description@@Quick start",
    },
  ],
};
