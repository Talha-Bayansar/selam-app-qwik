import { component$ } from "@builder.io/qwik";
import { Form, routeAction$ } from "@builder.io/qwik-city";
import { Speak, useTranslate } from "qwik-speak";
import { AnimatedButton, Page } from "~/shared";

export const useAddMember = routeAction$(async (data, requestEvent) => {
  console.log(data, requestEvent);
  return {
    success: true,
  };
});

const Members = component$(() => {
  const t = useTranslate();
  const addMemberAction = useAddMember();

  return (
    <Page class="flex-grow" title={t("members.newMember@@New member")}>
      <Form
        class="flex flex-grow flex-col justify-between"
        action={addMemberAction}
      >
        <div class="flex flex-col gap-4">
          <label for="firstName" class="flex flex-col gap-2">
            {t("members.firstName@@First name")}*
            <input
              class="border-primary rounded-lg border p-2"
              type="text"
              name="firstName"
              placeholder="John"
              required
            />
          </label>
          <label for="lastName" class="flex flex-col gap-2">
            {t("members.lastName@@Last name")}*
            <input
              class="border-primary rounded-lg border p-2"
              type="text"
              name="lastName"
              placeholder="Doe"
              required
            />
          </label>
          <label for="dateOfBirth" class="flex flex-col gap-2">
            {t("members.dateOfBirth@@Date of birth")}
            <input
              class="border-primary rounded-lg border p-2"
              type="date"
              name="dateOfBirth"
            />
          </label>
        </div>
        <AnimatedButton
          animation={{ scale: true, shadow: true }}
          type="submit"
          class="bg-primary shadow-dark rounded-lg py-2 text-white"
          disabled={addMemberAction.isRunning}
        >
          {addMemberAction.isRunning
            ? t("app.creating@@Creating")
            : t("app.create@@Create")}
        </AnimatedButton>
      </Form>
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
