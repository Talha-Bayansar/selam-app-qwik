import { type RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    public: false,
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 5,
    maxAge: 5,
  });
};
