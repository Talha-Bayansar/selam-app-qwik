import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { XataClient } from "./xata";

export const xata = (env: EnvGetter) =>
  new XataClient({
    apiKey: env.get("XATA_API_KEY"),
    branch: env.get("XATA_BRANCH"),
  });
export * from "./xata";
