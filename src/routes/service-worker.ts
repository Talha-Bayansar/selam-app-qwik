/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

setupServiceWorker();

const cacheName = "selam-app";

addEventListener("install", (e) => {
  console.log("[Service worker] install", e);
  const event = e as ExtendableEvent;
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    return cache.addAll(["/", "/settings", "/static/styles.css"]);
  };
  event.waitUntil(preCache());
});

addEventListener("activate", (e) => {
  console.log("[Service worker] activate", e);
  return self.clients.claim();
});

addEventListener("fetch", (e) => {
  console.log("[Service worker] fetch", e);
  const event = e as FetchEvent;
  event.respondWith(
    (async () => {
      const r = await caches.match(event.request);
      console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
      if (r) {
        return r;
      }
      const response = await fetch(event.request);
      const cache = await caches.open(cacheName);
      console.log(
        `[Service Worker] Caching new resource: ${event.request.url}`,
      );
      cache.put(event.request, response.clone());
      return response;
    })(),
  );
});

declare const self: ServiceWorkerGlobalScope;
