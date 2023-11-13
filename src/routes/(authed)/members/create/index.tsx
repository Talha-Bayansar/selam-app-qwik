import { type HTMLInputTypeAttribute, component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  type InitialValues,
  formAction$,
  valiForm$,
  useForm,
} from "@modular-forms/qwik";
import { Speak, useTranslate } from "qwik-speak";
import { type GendersRecord, xata } from "~/db";
import { getServerSession } from "~/routes/plugin@auth";
import { AnimatedButton, InputField, Page, SelectField } from "~/shared";
import { routes } from "~/utils";
import { type Input, minLength, object, string, nullable } from "valibot";

type TInputField = {
  name: "firstName" | "lastName" | "dateOfBirth" | "address" | "gender";
  placeholder?: string;
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
};

const FormSchema = object({
  firstName: string([minLength(1, "requiredField")]),
  lastName: string([minLength(1, "requiredField")]),
  dateOfBirth: nullable(string()),
  address: nullable(string()),
  gender: string(),
});

type LoginForm = Input<typeof FormSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  address: "",
  gender: "",
}));

export const useGenders = routeLoader$(async () => {
  const response = await xata.db.genders.getAll();
  return response as GendersRecord[];
});

export const useAddMember = formAction$<LoginForm>(async (data, event) => {
  const session = getServerSession(event);

  try {
    await xata.db.members.create({
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
}, valiForm$(FormSchema));

const CreateMember = component$(() => {
  const t = useTranslate();
  const genders = useGenders();
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useAddMember(),
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
    <Page
      class="flex-grow md:items-center"
      title={t("members.newMember@@New member")}
    >
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
          disabled={loginForm.submitting}
        >
          {loginForm.submitting
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
      <CreateMember />
    </Speak>
  );
});

//TODO: add meta data
