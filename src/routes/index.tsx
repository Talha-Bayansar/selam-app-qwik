import { type JSXChildren, component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { MaterialSymbolsGroupsSharp, MaterialSymbolsPerson } from "~/shared";
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
      icon: <MaterialSymbolsPerson size={32} color={primaryColor} />,
      href: routes.members,
    },
    {
      name: t("root.apps.groups@@Groups"),
      icon: <MaterialSymbolsGroupsSharp size={32} color={primaryColor} />,
      href: routes.groups,
    },
  ];

  return (
    <section class="text-primary flex flex-col gap-8">
      <h1 class="text-4xl">{t("root.title@@Apps")}</h1>
      <div class="grid grid-cols-2 gap-4">
        {apps.map((app) => (
          <Link
            key={app.name}
            href={app.href}
            onTouchStart$={(event, element) => {
              element.classList.toggle("scale-95");
              element.classList.toggle("shadow-none");
            }}
            onTouchEnd$={(event, element) => {
              element.classList.toggle("scale-95");
              element.classList.toggle("shadow-none");
            }}
            class="shadow-dark flex flex-col items-center rounded-lg p-4 transition-all"
          >
            {app.icon}
            {app.name}
          </Link>
        ))}
      </div>
    </section>
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
