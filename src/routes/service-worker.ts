/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
// import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

// setupServiceWorker();

// addEventListener("install", (e) => {
//   e.waitUntil();
// });

// addEventListener("activate", () => self.clients.claim());

// declare const self: ServiceWorkerGlobalScope;

self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install", e);
  // e.waitUntil(
  //   (async () => {
  //     const cache = await caches.open(cacheName);
  //     console.log("[Service Worker] Caching all: app shell and content");
  //     await cache.addAll(contentToCache);
  //   })(),
  // );
});

self.addEventListener("activate", (e) => {
  console.log("[Service Worker] Activate", e);
});
