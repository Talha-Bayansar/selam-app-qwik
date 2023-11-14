import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { type ClassNameValue, twMerge } from "tailwind-merge";

type Props = {
  label: string;
  error?: string;
} & QwikIntrinsicElements["input"];

export const InputField = component$(
  ({ label, error, name, required, type, placeholder, ...rest }: Props) => {
    return (
      <label
        for={name}
        class={twMerge("flex flex-col gap-2", rest.class as ClassNameValue)}
      >
        <span>
          {label}
          {required && "*"}
        </span>
        <input
          {...rest}
          class="border-primary rounded-lg border p-2"
          type={type}
          name={name}
          placeholder={placeholder}
        />
        {error && <p class="text-red-600">{error}</p>}
      </label>
    );
  },
);
