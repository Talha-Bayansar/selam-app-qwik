// Generated by Xata Codegen 0.27.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "nextauth_users",
    columns: [
      { name: "email", type: "email" },
      { name: "emailVerified", type: "datetime" },
      { name: "name", type: "string" },
      { name: "image", type: "string" },
    ],
    revLinks: [
      { column: "user", table: "nextauth_accounts" },
      { column: "user", table: "nextauth_users_accounts" },
      { column: "user", table: "nextauth_users_sessions" },
      { column: "user", table: "nextauth_sessions" },
    ],
  },
  {
    name: "nextauth_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "type", type: "string" },
      { name: "provider", type: "string" },
      { name: "providerAccountId", type: "string" },
      { name: "refresh_token", type: "string" },
      { name: "access_token", type: "string" },
      { name: "expires_at", type: "int" },
      { name: "token_type", type: "string" },
      { name: "scope", type: "string" },
      { name: "id_token", type: "text" },
      { name: "session_state", type: "string" },
    ],
    revLinks: [{ column: "account", table: "nextauth_users_accounts" }],
  },
  {
    name: "nextauth_verificationTokens",
    columns: [
      { name: "identifier", type: "string" },
      { name: "token", type: "string" },
      { name: "expires", type: "datetime" },
    ],
  },
  {
    name: "nextauth_users_accounts",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "account", type: "link", link: { table: "nextauth_accounts" } },
    ],
  },
  {
    name: "nextauth_users_sessions",
    columns: [
      { name: "user", type: "link", link: { table: "nextauth_users" } },
      { name: "session", type: "link", link: { table: "nextauth_sessions" } },
    ],
  },
  {
    name: "nextauth_sessions",
    columns: [
      { name: "sessionToken", type: "string" },
      { name: "expires", type: "datetime" },
      { name: "user", type: "link", link: { table: "nextauth_users" } },
    ],
    revLinks: [{ column: "session", table: "nextauth_users_sessions" }],
  },
  {
    name: "organisations",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "Not specified",
      },
      { name: "logo", type: "file" },
    ],
    revLinks: [
      { column: "organization", table: "members" },
      { column: "organization", table: "groups" },
      { column: "organisation", table: "organisations_members" },
      { column: "organisation", table: "organisations_groups" },
    ],
  },
  {
    name: "members",
    columns: [
      {
        name: "firstName",
        type: "string",
        notNull: true,
        defaultValue: "Not specified",
      },
      {
        name: "lastName",
        type: "string",
        notNull: true,
        defaultValue: "Not specified",
      },
      { name: "dateOfBirth", type: "datetime" },
      { name: "phoneNumber", type: "string" },
      { name: "address", type: "string" },
      { name: "gender", type: "link", link: { table: "genders" } },
      { name: "organization", type: "link", link: { table: "organisations" } },
    ],
    revLinks: [
      { column: "member", table: "members_groups" },
      { column: "member", table: "organisations_members" },
    ],
  },
  {
    name: "groups",
    columns: [
      { name: "name", type: "string", unique: true },
      { name: "organization", type: "link", link: { table: "organisations" } },
    ],
    revLinks: [
      { column: "group", table: "members_groups" },
      { column: "group", table: "organisations_groups" },
    ],
  },
  {
    name: "genders",
    columns: [{ name: "name", type: "string", unique: true }],
    revLinks: [{ column: "gender", table: "members" }],
  },
  {
    name: "members_groups",
    columns: [
      { name: "member", type: "link", link: { table: "members" } },
      { name: "group", type: "link", link: { table: "groups" } },
    ],
  },
  {
    name: "organisations_members",
    columns: [
      { name: "member", type: "link", link: { table: "members" } },
      { name: "organisation", type: "link", link: { table: "organisations" } },
    ],
  },
  {
    name: "organisations_groups",
    columns: [
      { name: "organisation", type: "link", link: { table: "organisations" } },
      { name: "group", type: "link", link: { table: "groups" } },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type NextauthUsers = InferredTypes["nextauth_users"];
export type NextauthUsersRecord = NextauthUsers & XataRecord;

export type NextauthAccounts = InferredTypes["nextauth_accounts"];
export type NextauthAccountsRecord = NextauthAccounts & XataRecord;

export type NextauthVerificationTokens =
  InferredTypes["nextauth_verificationTokens"];
export type NextauthVerificationTokensRecord = NextauthVerificationTokens &
  XataRecord;

export type NextauthUsersAccounts = InferredTypes["nextauth_users_accounts"];
export type NextauthUsersAccountsRecord = NextauthUsersAccounts & XataRecord;

export type NextauthUsersSessions = InferredTypes["nextauth_users_sessions"];
export type NextauthUsersSessionsRecord = NextauthUsersSessions & XataRecord;

export type NextauthSessions = InferredTypes["nextauth_sessions"];
export type NextauthSessionsRecord = NextauthSessions & XataRecord;

export type Organisations = InferredTypes["organisations"];
export type OrganisationsRecord = Organisations & XataRecord;

export type Members = InferredTypes["members"];
export type MembersRecord = Members & XataRecord;

export type Groups = InferredTypes["groups"];
export type GroupsRecord = Groups & XataRecord;

export type Genders = InferredTypes["genders"];
export type GendersRecord = Genders & XataRecord;

export type MembersGroups = InferredTypes["members_groups"];
export type MembersGroupsRecord = MembersGroups & XataRecord;

export type OrganisationsMembers = InferredTypes["organisations_members"];
export type OrganisationsMembersRecord = OrganisationsMembers & XataRecord;

export type OrganisationsGroups = InferredTypes["organisations_groups"];
export type OrganisationsGroupsRecord = OrganisationsGroups & XataRecord;

export type DatabaseSchema = {
  nextauth_users: NextauthUsersRecord;
  nextauth_accounts: NextauthAccountsRecord;
  nextauth_verificationTokens: NextauthVerificationTokensRecord;
  nextauth_users_accounts: NextauthUsersAccountsRecord;
  nextauth_users_sessions: NextauthUsersSessionsRecord;
  nextauth_sessions: NextauthSessionsRecord;
  organisations: OrganisationsRecord;
  members: MembersRecord;
  groups: GroupsRecord;
  genders: GendersRecord;
  members_groups: MembersGroupsRecord;
  organisations_members: OrganisationsMembersRecord;
  organisations_groups: OrganisationsGroupsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Talha-Bayansar-s-workspace-l2p3gj.eu-central-1.xata.sh/db/selam-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
