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

export const ElevatedButton = component$((props: Props) => {
  return (
    <AnimatedButton
      {...props}
      class={twMerge(
        "rounded-lg bg-primary p-2 text-white shadow-dark",
        props.class as ClassNameValue,
      )}
      animation={{
        scale: true,
        shadow: true,
        ...props.animation,
      }}
    >
      <Slot />
    </AnimatedButton>
  );
});
