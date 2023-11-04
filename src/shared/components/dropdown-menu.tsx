import { component$, useSignal, type JSXChildren } from "@builder.io/qwik";

interface Props {
  items: JSXChildren[];
  label: string | JSXChildren;
}

export const DropdownMenu = component$(({ items, label }: Props) => {
  const isActive = useSignal(false);

  return (
    <div class="relative inline-block text-left">
      <div>
        <button
          type="button"
          class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick$={() => (isActive.value = !isActive.value)}
        >
          {label}
          <svg
            class="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isActive.value && (
        <div
          class="absolute right-0 z-10 mt-2 flex w-full origin-top-right flex-col rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          tabIndex={-1}
        >
          {items.map((item) => item)}
        </div>
      )}
    </div>
  );
});
