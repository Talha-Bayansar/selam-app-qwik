import { type QwikIntrinsicElements, component$ } from "@builder.io/qwik";
import { Link, routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { type ClassNameValue, twMerge } from "tailwind-merge";
import { type Member } from "~/db";
import { getAllMembers } from "~/members";
import { AnimatedButton, MaterialSymbolsAdd, Page } from "~/shared";
import { routes } from "~/utils";

export const useMembers = routeLoader$(async () => {
  const members = await getAllMembers();
  return members;
});

const Members = component$(() => {
  const t = useTranslate();
  const members = useMembers();
  return (
    <Page class="relative pb-8" title={t("members.title@@Members")}>
      <div class="flex flex-col">
        {members.value.map((member, i) => (
          <ListItem
            key={member.id}
            member={member}
            isLastItem={members.value.length <= i + 1}
          />
        ))}
      </div>
      <Link href={`${routes.members}/create`} class="fixed bottom-24 right-8">
        <AnimatedButton
          class="bg-primary shadow-dark rounded-full p-4 text-white"
          animation={{ scale: true, shadow: true }}
        >
          <MaterialSymbolsAdd size={24} />
        </AnimatedButton>
      </Link>
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
        <AnimatedButton
          {...rest}
          animation={{
            background: true,
          }}
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
        </AnimatedButton>
        {!isLastItem && <hr />}
      </>
    );
  },
);

//TODO: add meta data
