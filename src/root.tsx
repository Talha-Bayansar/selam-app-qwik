import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./shared/components/router-head";

import "./global.css";
import { QwikSpeakProvider } from "qwik-speak";
import { config } from "./speak-config";
import { translationFn } from "./speak-functions";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikSpeakProvider config={config} translationFn={translationFn}>
      <QwikCityProvider>
        <head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />
          <RouterHead />
          <ServiceWorkerRegister />
        </head>
        <body class="text-primary">
          <RouterOutlet />
        </body>
      </QwikCityProvider>
    </QwikSpeakProvider>
  );
});
