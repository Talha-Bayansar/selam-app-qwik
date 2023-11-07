import {
  type QwikIntrinsicElements,
  component$,
  Slot,
  type QwikTouchEvent,
  type QRL,
  $,
} from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  onCustomTouchStart$?: QRL<
    (
      event: QwikTouchEvent<HTMLButtonElement>,
      element: HTMLButtonElement,
    ) => any
  >;
  onCustomTouchEnd$?: QRL<
    (
      event: QwikTouchEvent<HTMLButtonElement>,
      element: HTMLButtonElement,
    ) => any
  >;
  animation?: {
    scale?: boolean;
    background?: boolean;
    shadow?: boolean;
  };
} & QwikIntrinsicElements["button"];

export const AnimatedButton = component$((props: Props) => {
  const { onCustomTouchStart$, onCustomTouchEnd$, animation } = props;

  const handleTouch$ = $(
    (event: QwikTouchEvent<HTMLButtonElement>, element: HTMLButtonElement) => {
      if (animation) {
        const { scale, background, shadow } = animation;
        if (scale) {
          element.classList.toggle("standalone:scale-95");
          // element.classList.toggle("scale-95");
        }
        if (background) {
          element.classList.toggle("standalone:bg-secondary-transparent-30");
          // element.classList.toggle("bg-secondary-transparent-30");
        }
        if (shadow) {
          element.classList.toggle("standalone:shadow-none");
          // element.classList.toggle("shadow-none");
        }
      }
    },
  );
  return (
    <button
      {...props}
      onTouchStart$={(event, element) => {
        handleTouch$(event, element);
        if (onCustomTouchStart$) onCustomTouchStart$(event, element);
      }}
      onTouchEnd$={(event, element) => {
        handleTouch$(event, element);
        if (onCustomTouchEnd$) onCustomTouchEnd$(event, element);
      }}
      class={twMerge("w-full transition-all", props.class as ClassNameValue)}
    >
      <Slot />
    </button>
  );
});
