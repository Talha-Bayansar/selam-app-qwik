import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { type ClassNameValue, twMerge } from "tailwind-merge";
import { type Member } from "~/db";
import { getAllMembers } from "~/members";
import { Page } from "~/shared";

export const useMembers = routeLoader$(async () => {
  const members = await getAllMembers();
  return members;
});

const Members = component$(() => {
  const t = useTranslate();
  const members = useMembers();
  return (
    <Page title={t("members.title@@Members")}>
      <div class="flex flex-col">
        {members.value.map((member, i) => (
          <ListItem
            key={member.id}
            member={member}
            isLastItem={members.value.length <= i + 1}
          />
        ))}
      </div>
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

type ListItemProps = {
  isLastItem: boolean;
  member: Member;
} & QwikIntrinsicElements["button"];

const ListItem = component$(
  ({ isLastItem, member, ...rest }: ListItemProps) => {
    const t = useTranslate();
    return (
      <>
        <button
          {...rest}
          onTouchStart$={(_, el) =>
            el.classList.toggle("bg-secondary-transparent-30")
          }
          onTouchEnd$={(_, el) =>
            el.classList.toggle("bg-secondary-transparent-30")
          }
          class={twMerge(
            "flex flex-col gap-1 py-2 transition-colors",
            rest.class as ClassNameValue,
          )}
        >
          <div>
            {member.firstName} {member.lastName}
          </div>
          <div class="text-xs opacity-75">
            {member.dateOfBirth ?? t("app.errors.notSpecified@@Not specified")}
          </div>
        </button>
        {!isLastItem && <hr />}
      </>
    );
  },
);

//TODO: add meta data
