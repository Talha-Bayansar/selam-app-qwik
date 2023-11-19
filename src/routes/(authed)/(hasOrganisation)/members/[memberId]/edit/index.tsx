import { component$ } from "@builder.io/qwik";
import {
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
  FormError,
} from "@modular-forms/qwik";
import { Speak, useTranslate } from "qwik-speak";
import {
  type TMembersForm,
  MembersFormSchema,
  type TInputField,
} from "~/members";
import { ElevatedButton, InputField, Page, SelectField } from "~/shared";
import { routeLoader$ } from "@builder.io/qwik-city";
import { xata, type GendersRecord } from "~/db";
import { routes } from "~/utils";

export const useFormLoader = routeLoader$<InitialValues<TMembersForm>>(
  async (requestEvent) => {
    const id = requestEvent.params.memberId;
    const member = await xata(requestEvent.env)
      .db.members.filter({
        id: id,
      })
      .getFirst();

    if (!member) {
      throw new FormError<TMembersForm>("Member does not exist");
    }

    return {
      firstName: member.firstName,
      lastName: member.lastName,
      dateOfBirth: member.dateOfBirth?.toISOString().split("T")[0] ?? "",
      address: member.address,
      gender: member.gender?.id ?? "",
    };
  },
);

export const useGenders = routeLoader$(async (event) => {
  const response = await xata(event.env).db.genders.getAll();
  return response as GendersRecord[];
});

export const useEditMember = formAction$<TMembersForm>(async (data, event) => {
  try {
    await xata(event.env).db.members.update({
      id: event.params.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      address: data.address || null,
      gender: data.gender || null,
    });
    event.redirect(302, routes.members);
  } catch (error: any) {
    return event.fail(error.errors[0].status, {
      message: error.errors[0].message,
    });
  }
}, valiForm$(MembersFormSchema));

export const EditMember = component$(() => {
  const t = useTranslate();
  const genders = useGenders();
  const [membersForm, { Form, Field }] = useForm<TMembersForm>({
    loader: useFormLoader(),
    action: useEditMember(),
    validate: valiForm$(MembersFormSchema),
  });

  const inputFields: TInputField[] = [
    {
      name: "firstName",
      placeholder: "John",
      label: t("members.firstName@@First name"),
      required: true,
    },
    {
      name: "lastName",
      placeholder: "Doe",
      label: t("members.lastName@@Last name"),
      required: true,
    },
    {
      name: "dateOfBirth",
      type: "date",
      label: t("members.dateOfBirth@@Date of birth"),
    },
    {
      name: "address",
      label: t("members.address@@Address"),
    },
  ];
  return (
    <Page class="flex-grow" title={t("members.editMember@@Edit member")}>
      <Form class="flex flex-grow flex-col justify-between md:w-full md:max-w-lg md:justify-start md:gap-8">
        <div class="flex flex-col gap-4">
          {inputFields.map((inputField) => (
            <Field key={inputField.name} name={inputField.name}>
              {(field, props) => (
                <InputField
                  {...props}
                  required={inputField.required}
                  placeholder={inputField.placeholder}
                  type={inputField.type}
                  label={inputField.label}
                  value={field.value}
                  error={
                    field.error &&
                    t(`app.errors.${field.error}@@${field.error}`)
                  }
                />
              )}
            </Field>
          ))}
          <Field name="gender">
            {(field, props) => (
              <SelectField
                label={t("members.gender@@Gender")}
                {...props}
                value={field.value}
                error={field.error}
              >
                <option value="">{t("app.notSelected@@Not selected")}</option>
                {genders.value.map((gender) => (
                  <option key={gender.name} value={gender.id}>
                    {gender.name as string}
                  </option>
                ))}
              </SelectField>
            )}
          </Field>
        </div>
        <ElevatedButton type="submit" disabled={membersForm.submitting}>
          {membersForm.submitting
            ? t("app.editing@@Editing")
            : t("app.edit@@Edit")}
        </ElevatedButton>
      </Form>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["members"]}>
      <EditMember />
    </Speak>
  );
});

//TODO: add meta data
