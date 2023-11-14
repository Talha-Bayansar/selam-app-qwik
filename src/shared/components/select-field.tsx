import { type QwikIntrinsicElements, component$, Slot } from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  label: string;
  error?: string;
} & QwikIntrinsicElements["select"];

export const SelectField = component$(({ label, error, ...rest }: Props) => {
  return (
    <label
      class={twMerge("flex flex-col gap-2", rest.class as ClassNameValue)}
      for={rest.name}
    >
      <span>
        {label}
        {rest.required && "*"}
      </span>
      <select {...rest} class="border-primary rounded-lg border p-2">
        <Slot />
      </select>
      {error && <p class="text-red-600">{error}</p>}
    </label>
  );
});
