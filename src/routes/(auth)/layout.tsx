import { Slot, component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <main class="flex flex-grow flex-col p-8">
        <Slot />
      </main>
    </div>
  );
});
