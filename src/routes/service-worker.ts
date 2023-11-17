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

import { warmStrategyCache } from "workbox-recipes";
import { CacheFirst } from "workbox-strategies";

// This can be any strategy, CacheFirst used as an example.
const strategy = new CacheFirst();
const urls = ["/offline"];

warmStrategyCache({ urls, strategy });

setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;
