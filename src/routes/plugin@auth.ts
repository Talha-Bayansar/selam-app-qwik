import { serverAuth$ } from "@builder.io/qwik-auth";
import Google from "@auth/core/providers/google";
import type { Provider } from "@auth/core/providers";
import { type Organisations, xata } from "~/db";
import { XataAdapter } from "@auth/xata-adapter";
import type {
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";
import { routes } from "~/utils";

type ISODateString = string;

interface CustomSession {
  user?: {
    email: string;
    id: string;
    image: string;
    name: string;
    emailVerified?: boolean;
    organisation?: Organisations;
    xata: {
      createdAt: string;
      updatedAt: string;
      version: number;
    };
  };
  expires: ISODateString;
}

export const { onRequest, useAuthSession, useAuthSignin, useAuthSignout } =
  serverAuth$(({ env }) => ({
    adapter: XataAdapter(xata),
    secret: env.get("AUTH_SECRET"),
    trustHost: true,
    callbacks: {
      async session({ session, user }) {
        if (session.user) {
          session.user = user;
        }
        return session;
      },
    },
    pages: {
      signIn: routes.signIn,
    },
    providers: [
      Google({
        clientId: env.get("GOOGLE_CLIENT_ID")!,
        clientSecret: env.get("GOOGLE_CLIENT_SECRET")!,
      }),
    ] as Provider[],
  }));

export const getServerSession = (
  event: RequestEventLoader | RequestEventAction,
) => {
  const session: CustomSession | null = event.sharedMap.get("session");
  return session;
};
