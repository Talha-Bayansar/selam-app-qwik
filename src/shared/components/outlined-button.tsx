import { type QwikIntrinsicElements, Slot, component$ } from "@builder.io/qwik";
import { AnimatedButton } from "./animated-button";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type AnimationProps = {
  class: string;
};

type Props = {
  animation?: {
    scale?: boolean | AnimationProps;
    background?: boolean | AnimationProps;
    shadow?: boolean | AnimationProps;
  };
} & QwikIntrinsicElements["button"];

export const OutlinedButton = component$((props: Props) => {
  return (
    <AnimatedButton
      {...props}
      animation={{
        background: true,
        ...props.animation,
      }}
      class={twMerge(
        "rounded-lg border border-secondary p-2",
        props.class as ClassNameValue,
      )}
    >
      <Slot />
    </AnimatedButton>
  );
});
