import { Slot, component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Spinner } from "~/shared";

export default component$(() => {
  const loc = useLocation();
  return (
    <div class="min-h-screen w-screen">
      <Slot />
      {loc.isNavigating && (
        <Spinner size={16} class="fixed right-2 top-2 md:left-2" />
      )}
    </div>
  );
});
