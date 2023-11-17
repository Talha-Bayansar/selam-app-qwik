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
    return cache.addAll(["/", "/signin", "no-access", "/settings"]);
  };
  event.waitUntil(preCache());
});

addEventListener("activate", (e) => {
  console.log("[Service worker] activate", e);
  return self.clients.claim();
});

declare const self: ServiceWorkerGlobalScope;
