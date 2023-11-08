import { serverAuth$ } from "@builder.io/qwik-auth";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { xata } from "~/db";
import { XataAdapter } from "@auth/xata-adapter";

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    adapter: XataAdapter(xata),
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    providers: [
      Google({
        clientId: env.get("GOOGLE_CLIENT_ID")!,
        clientSecret: env.get("GOOGLE_CLIENT_SECRET")!,
      }),
    ] as Provider[],
  }));
