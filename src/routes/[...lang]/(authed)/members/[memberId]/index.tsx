import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useFormatDate, useTranslate } from "qwik-speak";
import { type MembersRecord, xata } from "~/db";
import { Page } from "~/shared";

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

const MemberDetails = component$(() => {
  const t = useTranslate();
  const d = useFormatDate();
  const member = useMember();

  if (!member.value) {
    return (
      <Page title={t("app.errors.notFound@@Not found")}>
        <p>
          {t("members.errors.memberDoesNotExist@@This member does not exist")}.
        </p>
      </Page>
    );
  }

  return (
    <Page title={`${member.value.firstName} ${member.value.lastName}`}>
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
