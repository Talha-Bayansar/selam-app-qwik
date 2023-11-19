import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useFormatDate, useTranslate } from "qwik-speak";
import { type MembersRecord, xata } from "~/db";
import { getServerSession } from "~/routes/plugin@auth";
import { FAB, ListTile, MaterialSymbolsAdd, Page } from "~/shared";
import { routes } from "~/utils";

export const useMembers = routeLoader$(async (event) => {
  const session = getServerSession(event);

  const response = await xata(event.env)
    .db.members.filter({
      "organization.id": session?.user?.organisation?.id,
    })
    .sort("firstName", "asc")
    .getPaginated({
      pagination: {
        size: 20,
      },
    });

  return response.records as MembersRecord[];
});

const Members = component$(() => {
  const t = useTranslate();
  const d = useFormatDate();
  const members = useMembers();

  return (
    <Page class="relative pb-8" title={t("members.title@@Members")}>
      <div class="flex flex-col">
        {members.value.map((member, i) => (
          <a key={member.id} href={`${routes.members}/${member.id}`}>
            <ListTile
              title={`${member.firstName} ${member.lastName}`}
              subTitle={
                member.dateOfBirth
                  ? d(member.dateOfBirth, {
                      dateStyle: "long",
                    })
                  : t("app.errors.notSpecified@@Not specified")
              }
              isLastItem={members.value.length <= i + 1}
            />
          </a>
        ))}
      </div>
      <FAB href={`${routes.members}/create`}>
        <MaterialSymbolsAdd size={24} />
      </FAB>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["members"]}>
      <Members />
    </Speak>
  );
});

//TODO: add meta data
