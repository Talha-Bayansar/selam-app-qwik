import {
  type QwikIntrinsicElements,
  component$,
  Slot,
  type QwikTouchEvent,
  type QRL,
  $,
} from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type AnimationProps = {
  class: string;
};

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
    scale?: boolean | AnimationProps;
    background?: boolean | AnimationProps;
    shadow?: boolean | AnimationProps;
  };
} & QwikIntrinsicElements["button"];

export const AnimatedButton = component$((props: Props) => {
  const { onCustomTouchStart$, onCustomTouchEnd$, animation } = props;

  const handleTouchStart$ = $(
    (_: QwikTouchEvent<HTMLButtonElement>, element: HTMLButtonElement) => {
      if (animation) {
        const { scale, background, shadow } = animation;
        if (scale) {
          element.classList.add(scale === true ? "scale-95" : scale.class);
        }
        if (background) {
          element.classList.add(
            background === true
              ? "bg-secondary-transparent-30"
              : background.class,
          );
        }
        if (shadow) {
          element.classList.add(shadow === true ? "shadow-none" : shadow.class);
        }
      }
    },
  );
  const handleTouchEnd$ = $(
    (event: QwikTouchEvent<HTMLButtonElement>, element: HTMLButtonElement) => {
      if (animation) {
        const { scale, background, shadow } = animation;
        if (scale) {
          element.classList.remove(scale === true ? "scale-95" : scale.class);
        }
        if (background) {
          element.classList.remove(
            background === true
              ? "bg-secondary-transparent-30"
              : background.class,
          );
        }
        if (shadow) {
          element.classList.remove(
            shadow === true ? "shadow-none" : shadow.class,
          );
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
