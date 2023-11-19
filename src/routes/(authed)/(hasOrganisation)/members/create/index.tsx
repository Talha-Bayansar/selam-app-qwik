import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  formAction$,
  valiForm$,
  useForm,
} from "@modular-forms/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { type GendersRecord, xata } from "~/db";
import {
  MembersFormSchema,
  type TInputField,
  type TMembersForm,
} from "~/members";
import { getServerSession } from "~/routes/plugin@auth";
import { ElevatedButton, InputField, Page, SelectField } from "~/shared";
import { routes } from "~/utils";

export const useFormLoader = routeLoader$<InitialValues<TMembersForm>>(() => ({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  address: "",
  gender: "",
}));

export const useGenders = routeLoader$(async (event) => {
  const response = await xata(event.env).db.genders.getAll();
  return response as GendersRecord[];
});

export const useAddMember = formAction$<TMembersForm>(async (data, event) => {
  const session = getServerSession(event);

  try {
    await xata(event.env).db.members.create({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      address: data.address || null,
      gender: data.gender || null,
      organization: session?.user?.organisation?.id,
    });
    event.redirect(302, routes.members);
  } catch (error: any) {
    return event.fail(error.errors[0].status, {
      message: error.errors[0].message,
    });
  }
}, valiForm$(MembersFormSchema));

const CreateMember = component$(() => {
  const t = useTranslate();
  const genders = useGenders();
  const [membersForm, { Form, Field }] = useForm<TMembersForm>({
    loader: useFormLoader(),
    action: useAddMember(),
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
    <Page class="flex-grow" title={t("members.newMember@@New member")}>
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
            ? t("app.creating@@Creating")
            : t("app.create@@Create")}
        </ElevatedButton>
      </Form>
    </Page>
  );
});

export default component$(() => {
  return (
    <Speak assets={["members"]}>
      <CreateMember />
    </Speak>
  );
});

//TODO: add meta data
