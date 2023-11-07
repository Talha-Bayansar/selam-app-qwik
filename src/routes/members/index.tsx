import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { twMerge } from "tailwind-merge";
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
          <>
            <button
              onTouchStart$={(_, el) =>
                el.classList.toggle("bg-secondary-transparent-30")
              }
              onTouchEnd$={(_, el) =>
                el.classList.toggle("bg-secondary-transparent-30")
              }
              class={twMerge("flex flex-col gap-1 py-2 transition-colors")}
            >
              <div>
                {member.firstName} {member.lastName}
              </div>
              {member.dateOfBirth && (
                <div class="text-xs opacity-75">{member.dateOfBirth}</div>
              )}
            </button>
            {!(members.value.length <= i + 1) && <hr />}
          </>
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

//TODO: add meta data
