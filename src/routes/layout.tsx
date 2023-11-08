import { type RequestHandler } from "@builder.io/qwik-city";
import { onRequest as onAuthedRequest } from "./plugin@auth";

export const onRequest: RequestHandler = async (requestEvent) => {
  const response = await onAuthedRequest(requestEvent);
  console.log(response);
};
