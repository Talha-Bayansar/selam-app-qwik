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
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";

const revision = import.meta.env.VITE_GIT_COMMIT_HASH;

precacheAndRoute([
  { url: "/", revision },
  { url: "/no-access", revision },
  { url: "/settings", revision },
  { url: "/signin", revision },
  { url: "/manifest.json", revision },
  { url: "/icon512_maskable.png", revision },
  { url: "/icon512_rounded.png", revision },
]);
cleanupOutdatedCaches();
registerRoute(new NavigationRoute(createHandlerBoundToURL("/")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/no-access")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/settings")));
registerRoute(new NavigationRoute(createHandlerBoundToURL("/signin")));
registerRoute(
  ({ request }) =>
    request.destination === "style" || request.destination === "image",
  new CacheFirst(),
);

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;
