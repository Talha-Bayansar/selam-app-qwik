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
import { precacheAndRoute } from "workbox-precaching";
import {
  NavigationRoute,
  registerRoute,
  setDefaultHandler,
} from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

const revision = Date.now().toString();

precacheAndRoute([{ url: "/offline", revision }]);

// Set up a route to handle navigation requests
registerRoute(
  new NavigationRoute(async ({ event }) => {
    // Check if the browser is offline
    if (!navigator.onLine) {
      const response = await caches.match("/offline");
      if (response) {
        return response;
      } // Redirect navigation to offline page
    }
    const e = event as FetchEvent;
    // Otherwise, proceed with the requested URL
    return fetch(e.request);
  }),
);

// Set the default handler for non-navigation requests
setDefaultHandler(new StaleWhileRevalidate());

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;
