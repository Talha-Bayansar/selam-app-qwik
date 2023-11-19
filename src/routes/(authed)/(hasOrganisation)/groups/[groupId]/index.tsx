import { $, component$ } from "@builder.io/qwik";
import { routeAction$, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { type GroupsRecord, xata } from "~/db";
import { getServerSession } from "~/routes/plugin@auth";
import { OutlinedButton, Page } from "~/shared";
import { routes } from "~/utils";

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

export const useDeleteGroup = routeAction$(async (_, event) => {
  const result = await xata(event.env).db.groups.delete({
    id: event.params.groupId,
  });

  if (result) {
    throw event.redirect(308, routes.groups);
  } else {
    return event.fail(404, {});
  }
});

const GroupDetails = component$(() => {
  const group = useGroup();
  const t = useTranslate();
  const loc = useLocation();
  const deleteGroup = useDeleteGroup();

  if (!group.value) {
    return (
      <Page title={t("app.errors.notFound@@Not found")}>
        {t("groups.errors.groupDoesNotExist@@This group does not exist.")}
      </Page>
    );
  }

  const confirmText = t(
    "groups.deleteGroupConfirmation@@Are you sure you want to delete this group?",
  );

  const handleDelete = $(async () => {
    const isConfirmed = confirm(confirmText);
    if (isConfirmed) {
      await deleteGroup.submit();
    }
  });

  return (
    <Page class="gap-4 md:max-w-lg" title={group.value.name!}>
      <div class="flex gap-4">
        <a href={`${routes.groups}/${loc.params.groupId}/edit`} class="w-full">
          <OutlinedButton>{t("app.edit@@Edit")}</OutlinedButton>
        </a>
        <OutlinedButton
          animation={{
            background: {
              class: "bg-red-100",
            },
          }}
          onClick$={handleDelete}
          disabled={deleteGroup.isRunning}
          class="border-red-300 p-2 text-red-600"
        >
          {deleteGroup.isRunning
            ? t("app.deleting@@Deleting")
            : t("app.delete@@Delete")}
        </OutlinedButton>
      </div>
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
