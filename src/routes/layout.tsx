import { Slot, component$ } from "@builder.io/qwik";
import { type RequestHandler, useLocation } from "@builder.io/qwik-city";
import { Spinner } from "~/shared";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    public: false,
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 0,
  });
};

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
