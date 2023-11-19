import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  useForm,
  valiForm$,
  formAction$,
} from "@modular-forms/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { xata } from "~/db";
import { GroupsFormSchema, type TGroupsForm } from "~/groups";
import { getServerSession } from "~/routes/plugin@auth";
import { ElevatedButton, InputField, Page } from "~/shared";
import { routes } from "~/utils";

export const useFormLoader = routeLoader$<InitialValues<TGroupsForm>>(() => ({
  name: "",
}));

export const useAddGroup = formAction$<TGroupsForm>(async (data, event) => {
  const session = getServerSession(event);

  try {
    await xata(event.env).db.groups.create({
      name: data.name,
      organization: session?.user?.organisation?.id,
    });
    event.redirect(302, routes.groups);
  } catch (error: any) {
    return event.fail(error.errors[0].status, {
      message: error.errors[0].message,
    });
  }
}, valiForm$(GroupsFormSchema));

const CreateGroup = component$(() => {
  const t = useTranslate();
  const [groupsForm, { Form, Field }] = useForm<TGroupsForm>({
    loader: useFormLoader(),
    action: useAddGroup(),
    validate: valiForm$(GroupsFormSchema),
  });
  return (
    <Page
      class="flex-grow md:max-w-lg md:flex-grow-0"
      title={t("groups.newGroup@@New group")}
    >
      <Form class="flex flex-grow flex-col justify-between md:justify-start md:gap-4">
        <Field key="name" name="name">
          {(field, props) => (
            <InputField
              {...props}
              required
              placeholder="Selam"
              label={t("groups.name@@Name")}
              value={field.value}
              error={
                field.error && t(`app.errors.${field.error}@@${field.error}`)
              }
            />
          )}
        </Field>
        <ElevatedButton type="submit" disabled={groupsForm.submitting}>
          {groupsForm.submitting
            ? t("app.creating@@Creating")
            : t("app.create@@Create")}
        </ElevatedButton>
      </Form>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["groups"]}>
      <CreateGroup />
    </Speak>
  );
});
