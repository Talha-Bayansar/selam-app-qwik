import { Slot, component$ } from "@builder.io/qwik";
import { Link, type LinkProps } from "@builder.io/qwik-city";
import { AnimatedButton } from "./animated-button";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Props = LinkProps;

export const FAB = component$((props: Props) => {
  return (
    <Link
      href={props.href}
      class={twMerge(
        "fixed bottom-28 right-8 md:bottom-16 md:right-16",
        props.class as ClassNameValue,
      )}
    >
      <AnimatedButton
        class="rounded-full bg-primary p-4 text-white shadow-dark"
        animation={{ scale: true, shadow: true }}
      >
        <Slot />
      </AnimatedButton>
    </Link>
  );
});
