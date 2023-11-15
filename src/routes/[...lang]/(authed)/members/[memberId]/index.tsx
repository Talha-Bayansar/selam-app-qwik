import { $, component$ } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  useLocation,
} from "@builder.io/qwik-city";
import { Speak, useFormatDate, useTranslate } from "qwik-speak";
import { type MembersRecord, xata } from "~/db";
import { AnimatedButton, Page } from "~/shared";
import { routes } from "~/utils";

export const useMember = routeLoader$(async (requestEvent) => {
  const id = requestEvent.params.memberId;
  const result = await xata.db.members
    .filter({
      id: id,
    })
    .select(["*", "gender.name"])
    .getFirst();

  if (!result) {
    requestEvent.status(404);
  }

  return result as MembersRecord | null;
});

export const useDeleteMember = routeAction$(async (_, event) => {
  const result = await xata.db.members.delete({
    id: event.params.memberId,
  });

  if (result) {
    throw event.redirect(308, routes.members);
  } else {
    return event.fail(404, {});
  }
});

const MemberDetails = component$(() => {
  const t = useTranslate();
  const d = useFormatDate();
  const member = useMember();
  const loc = useLocation();
  const deleteMember = useDeleteMember();

  if (!member.value) {
    return (
      <Page title={t("app.errors.notFound@@Not found")}>
        <p>
          {t("members.errors.memberDoesNotExist@@This member does not exist")}.
        </p>
      </Page>
    );
  }

  const confirmText = t(
    "members.deleteMemberConfirmation@@Are you sure you want to delete this member?",
  );

  const handleDelete = $(async () => {
    const isConfirmed = confirm(confirmText);
    if (isConfirmed) {
      await deleteMember.submit();
    }
  });

  return (
    <Page
      class="gap-4"
      title={`${member.value.firstName} ${member.value.lastName}`}
    >
      <div class="flex gap-4">
        <Link
          href={`${routes.members}/${loc.params.memberId}/edit`}
          class="w-full"
        >
          <AnimatedButton
            animation={{
              background: true,
            }}
            class="border-secondary rounded-lg border p-2"
          >
            {t("app.edit@@Edit")}
          </AnimatedButton>
        </Link>
        <AnimatedButton
          animation={{
            background: {
              class: "bg-red-100",
            },
          }}
          onClick$={handleDelete}
          disabled={deleteMember.isRunning}
          class="rounded-lg border border-red-300 p-2 text-red-600"
        >
          {deleteMember.isRunning
            ? t("app.deleting@@Deleting")
            : t("app.delete@@Delete")}
        </AnimatedButton>
      </div>
      <div class="flex flex-col">
        <p>
          {t("members.address@@Address")}: {member.value.address ?? "/"}
        </p>
        <p>
          {t("members.dateOfBirth@@Date of birth")}:{" "}
          {member.value.dateOfBirth
            ? d(member.value.dateOfBirth, { dateStyle: "long" })
            : "/"}
        </p>
        <p>
          {t("members.gender@@Gender")}: {member.value.gender?.name ?? "/"}
        </p>
      </div>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["members"]}>
      <MemberDetails />
    </Speak>
  );
});
