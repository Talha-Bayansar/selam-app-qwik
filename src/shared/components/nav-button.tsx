import { Slot, component$ } from "@builder.io/qwik";
import { AnimatedButton } from "./animated-button";

export const NavButton = component$(
  ({ isActive = false }: { isActive?: boolean }) => {
    return (
      <AnimatedButton
        animation={{ scale: true }}
        class={[
          "grid place-items-center",
          `${isActive ? "text-primary" : "text-primary-transparent-70"}`,
        ]}
      >
        <Slot />
      </AnimatedButton>
    );
  },
);
