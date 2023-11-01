import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import {
  Speak,
  useFormatDate,
  useFormatNumber,
  useTranslate,
} from "qwik-speak";

interface TitleProps {
  name: string;
}

export const Title = component$<TitleProps>((props) => {
  return <h1>{props.name}</h1>;
});

export const Home = component$(() => {
  const t = useTranslate();
  const fd = useFormatDate();
  const fn = useFormatNumber();

  const title = t("app.title@@{{name}} demo", { name: "Qwik Speak" });

  return (
    <>
      <Title name={title} />

      <h3>{t("home.dates@@Dates")}</h3>
      <p>{fd(Date.now(), { dateStyle: "full", timeStyle: "short" })}</p>

      <h3>{t("home.numbers@@Numbers")}</h3>
      <p>{fn(1000000, { style: "currency" })}</p>
    </>
  );
});

export default component$(() => {
  return (
    /**
     * Add Home translations (only available in child components)
     */
    <Speak assets={["home"]}>
      <Home />
    </Speak>
  );
});

export const head: DocumentHead = {
  title: "runtime.home.head.title@@Qwik Speak",
  meta: [
    {
      name: "description",
      content: "runtime.home.head.description@@Quick start",
    },
  ],
};
