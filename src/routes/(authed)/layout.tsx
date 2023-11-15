import { component$, Slot } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { routes } from "~/utils";
import { getServerSession } from "../plugin@auth";

export const onRequest: RequestHandler = (event) => {
  const session = getServerSession(event);
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(
      302,
      `${routes.signIn}?callbackUrl=${event.url.pathname}`,
    );
  }
};

export default component$(() => {
  return <Slot />;
});
