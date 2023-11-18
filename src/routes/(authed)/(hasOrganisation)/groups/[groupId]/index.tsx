import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { type GroupsRecord, xata } from "~/db";
import { getServerSession } from "~/routes/plugin@auth";
import { Page } from "~/shared";

type Group = {
  membersCount: number;
} & GroupsRecord;

export const useGroup = routeLoader$(async (event) => {
  const session = getServerSession(event);

  const id = event.params.groupId;
  const response = await xata(event.env)
    .db.groups.filter({
      id: id,
      "organization.id": session?.user?.organisation?.id,
    })
    .getFirst();
  if (!response) {
    event.status(404);
  }

  const aggregate = await xata(event.env).db.members_groups.aggregate({
    count: {
      count: {
        filter: {
          "group.id": response?.id,
        },
      },
    },
  });

  return { ...response, membersCount: aggregate.aggs.count } as Group | null;
});

const GroupDetails = component$(() => {
  const group = useGroup();
  const t = useTranslate();

  if (!group.value) {
    return (
      <Page title={t("app.errors.notFound@@Not found")}>
        {t("groups.errors.groupDoesNotExist@@This group does not exist.")}
      </Page>
    );
  }
  return (
    <Page title={group.value.name!}>
      <p>
        {t("groups.displayMemberCount@@Members: {{count}}", {
          count: group.value.membersCount,
        })}
      </p>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["groups"]}>
      <GroupDetails />
    </Speak>
  );
});
