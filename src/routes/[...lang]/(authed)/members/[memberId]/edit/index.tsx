import { component$ } from "@builder.io/qwik";
import {
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
} from "@modular-forms/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { type MembersForm, FormSchema, type TInputField } from "~/members";
import { AnimatedButton, InputField, Page, SelectField } from "~/shared";
import { routeLoader$ } from "@builder.io/qwik-city";
import { xata, type GendersRecord } from "~/db";
import { routes } from "~/utils";

export const useFormLoader = routeLoader$<InitialValues<MembersForm>>(
  async (requestEvent) => {
    const id = requestEvent.params.memberId;
    const member = await xata.db.members
      .filter({
        id: id,
      })
      .getFirst();

    if (!member) {
      requestEvent.status(404);
    }

    return {
      firstName: member?.firstName,
      lastName: member?.lastName,
      dateOfBirth: member?.dateOfBirth?.toISOString().split("T")[0],
      address: member?.address,
      gender: member?.gender?.id ?? "",
    };
  },
);

export const useGenders = routeLoader$(async () => {
  const response = await xata.db.genders.getAll();
  return response as GendersRecord[];
});

export const useEditMember = formAction$<MembersForm>(async (data, event) => {
  try {
    await xata.db.members.update({
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
}, valiForm$(FormSchema));

export const EditMember = component$(() => {
  const t = useTranslate();
  const genders = useGenders();
  const [membersForm, { Form, Field }] = useForm<MembersForm>({
    loader: useFormLoader(),
    action: useEditMember(),
    validate: valiForm$(FormSchema),
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
        <AnimatedButton
          animation={{ scale: true, shadow: true }}
          type="submit"
          class="bg-primary shadow-dark rounded-lg py-2 text-white"
          disabled={membersForm.submitting}
        >
          {membersForm.submitting
            ? t("app.editing@@Editing")
            : t("app.edit@@Edit")}
        </AnimatedButton>
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
