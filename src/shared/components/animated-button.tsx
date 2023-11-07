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

  const handleTouchStart$ = $(
    (event: QwikTouchEvent<HTMLButtonElement>, element: HTMLButtonElement) => {
      if (animation) {
        const { scale, background, shadow } = animation;
        if (scale) {
          element.classList.add("standalone:scale-95");
          // element.classList.toggle("scale-95");
        }
        if (background) {
          element.classList.add("standalone:bg-secondary-transparent-30");
          // element.classList.toggle("bg-secondary-transparent-30");
        }
        if (shadow) {
          element.classList.add("standalone:shadow-none");
          // element.classList.toggle("shadow-none");
        }
      }
    },
  );
  const handleTouchEnd$ = $(
    (event: QwikTouchEvent<HTMLButtonElement>, element: HTMLButtonElement) => {
      if (animation) {
        const { scale, background, shadow } = animation;
        if (scale) {
          element.classList.remove("standalone:scale-95");
          // element.classList.toggle("scale-95");
        }
        if (background) {
          element.classList.remove("standalone:bg-secondary-transparent-30");
          // element.classList.toggle("bg-secondary-transparent-30");
        }
        if (shadow) {
          element.classList.remove("standalone:shadow-none");
          // element.classList.toggle("shadow-none");
        }
      }
    },
  );
  return (
    <button
      {...props}
      onTouchStart$={(event, element) => {
        handleTouchStart$(event, element);
        if (onCustomTouchStart$) onCustomTouchStart$(event, element);
      }}
      onTouchEnd$={(event, element) => {
        handleTouchEnd$(event, element);
        if (onCustomTouchEnd$) onCustomTouchEnd$(event, element);
      }}
      onTouchCancel$={(event, element) => {
        handleTouchEnd$(event, element);
        if (onCustomTouchEnd$) onCustomTouchEnd$(event, element);
      }}
      class={twMerge("w-full transition-all", props.class as ClassNameValue)}
    >
      <Slot />
    </button>
  );
});
