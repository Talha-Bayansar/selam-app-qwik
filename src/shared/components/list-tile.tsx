import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";
import { AnimatedButton } from "./animated-button";

type Props = {
  isLastItem: boolean;
  title: string;
  subTitle?: string;
} & QwikIntrinsicElements["button"];

export const ListTile = component$(
  ({ title, isLastItem, subTitle, ...rest }: Props) => {
    return (
      <>
        <AnimatedButton
          {...rest}
          animation={{
            background: true,
          }}
          class={twMerge(
            "flex flex-col gap-1 py-2 transition-colors",
            rest.class as ClassNameValue,
          )}
        >
          <div>{title}</div>
          {subTitle && <div class="text-xs opacity-75">{subTitle}</div>}
        </AnimatedButton>
        {!isLastItem && <hr />}
      </>
    );
  },
);
