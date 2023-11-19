import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  useForm,
  valiForm$,
  formAction$,
  FormError,
} from "@modular-forms/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { xata } from "~/db";
import { GroupsFormSchema, type TGroupsForm } from "~/groups";
import { getServerSession } from "~/routes/plugin@auth";
import { ElevatedButton, InputField, Page } from "~/shared";
import { routes } from "~/utils";

export const useFormLoader = routeLoader$<InitialValues<TGroupsForm>>(
  async (event) => {
    const session = getServerSession(event);
    const id = event.params.groupId;
    const group = await xata(event.env)
      .db.groups.filter({
        id: id,
        "organization.id": session?.user?.organisation?.id,
      })
      .getFirst();

    if (!group) {
      throw new FormError<TGroupsForm>("Group does not exist");
    }

    return {
      name: group.name!,
    };
  },
);

export const useEditGroup = formAction$<TGroupsForm>(async (data, event) => {
  try {
    await xata(event.env).db.groups.update({
      id: event.params.groupId,
      name: data.name,
    });
    event.redirect(302, routes.groups);
  } catch (error: any) {
    return event.fail(error.errors[0].status, {
      message: error.errors[0].message,
    });
  }
}, valiForm$(GroupsFormSchema));

const EditGroup = component$(() => {
  const t = useTranslate();
  const [groupsForm, { Form, Field }] = useForm<TGroupsForm>({
    loader: useFormLoader(),
    action: useEditGroup(),
    validate: valiForm$(GroupsFormSchema),
  });
  return (
    <Page
      class="flex-grow md:max-w-lg md:flex-grow-0"
      title={t("groups.editGroup@@Edit group")}
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
            ? t("app.editing@@Editing")
            : t("app.edit@@Edit")}
        </ElevatedButton>
      </Form>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["groups"]}>
      <EditGroup />
    </Speak>
  );
});
