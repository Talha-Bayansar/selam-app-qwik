import { component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { xata, type GroupsRecord } from "~/db";
import { getServerSession } from "~/routes/plugin@auth";
import { ListTile, Page } from "~/shared";
import { routes } from "~/utils";

type Group = {
  membersCount: number;
} & GroupsRecord;

export const useGroups = routeLoader$(async (event) => {
  const session = getServerSession(event);
  const response = await xata(event.env)
    .db.groups.filter({
      "organization.id": session?.user?.organisation?.id,
    })
    .sort("name", "asc")
    .getPaginated({
      pagination: {
        size: 20,
      },
    });
  const groups: Group[] = [];
  for (const groupRecord of response.records as GroupsRecord[]) {
    const response = await xata(event.env).db.members_groups.aggregate({
      count: {
        count: {
          filter: {
            "group.id": groupRecord.id,
          },
        },
      },
    });
    groups.push({
      membersCount: response.aggs.count,
      ...groupRecord,
    });
  }
  return groups as Group[];
});

const Groups = component$(() => {
  const t = useTranslate();
  const groups = useGroups();

  return (
    <Page title={t("groups.title@@Groups")}>
      <div class="flex flex-col">
        {groups.value.map((group, i) => (
          <Link key={group.id} href={`${routes.groups}/${group.id}`}>
            <ListTile
              title={group.name!}
              subTitle={`${t("groups.displayMemberCount@@Members: {{count}}", {
                count: group.membersCount,
              })}`}
              isLastItem={i === groups.value.length - 1}
            />
          </Link>
        ))}
      </div>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["groups"]}>
      <Groups />
    </Speak>
  );
});
