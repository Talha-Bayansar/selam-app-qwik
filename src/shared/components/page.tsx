import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  title?: string;
} & QwikIntrinsicElements["div"];

export const Page = component$((props: Props) => {
  return (
    <div class={twMerge("flex flex-grow flex-col gap-8")}>
      <h1 class="text-4xl">{props.title}</h1>
      <div
        {...props}
        class={twMerge("flex flex-col", props.class as ClassNameValue)}
      >
        <Slot />
      </div>
    </div>
  );
});
