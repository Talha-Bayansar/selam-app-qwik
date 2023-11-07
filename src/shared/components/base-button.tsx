import {
  type QwikIntrinsicElements,
  component$,
  Slot,
  type QwikTouchEvent,
  type QRL,
} from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  onCustomTouchStart$: QRL<
    (
      event: QwikTouchEvent<HTMLButtonElement>,
      element: HTMLButtonElement,
    ) => any
  >;
  onCustomTouchEnd$: QRL<
    (
      event: QwikTouchEvent<HTMLButtonElement>,
      element: HTMLButtonElement,
    ) => any
  >;
} & QwikIntrinsicElements["button"];

export const BaseButton = component$((props: Props) => {
  const { onCustomTouchStart$, onCustomTouchEnd$ } = props;
  return (
    <button
      {...props}
      onTouchStart$={(event, element) => {
        element.classList.toggle("scale-95");
        onCustomTouchStart$(event, element);
      }}
      onTouchEnd$={(event, element) => {
        element.classList.toggle("scale-95");
        onCustomTouchEnd$(event, element);
      }}
      class={twMerge("w-full transition-all", props.class as ClassNameValue)}
    >
      <Slot />
    </button>
  );
});
