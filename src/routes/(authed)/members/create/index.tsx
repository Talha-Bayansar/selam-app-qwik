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
import { getServerSession } from "~/routes/plugin@auth";
import { AnimatedButton, InputField, Page } from "~/shared";
import { routes } from "~/utils";
import { type Input, minLength, object, string, nullable } from "valibot";

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
  dateOfBirth: null,
  address: null,
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
      address: (data.address as string) || null,
      gender: null,
      organization: session?.user?.organisation?.id,
    });
    event.redirect(302, routes.members);
  } catch (error) {
    return event.fail(401, {
      message: "createFailed",
    });
  }
}, valiForm$(FormSchema));

const Members = component$(() => {
  const t = useTranslate();
  const genders = useGenders();
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useAddMember(),
    validate: valiForm$(FormSchema),
  });

  // const formFields = [
  //   {
  //     name: "firstName",
  //     placeholder: "John",
  //     label: t("members.firstName@@First name"),
  //     required: true,
  //   },
  //   {
  //     name: "lastName",
  //     placeholder: "Doe",
  //     label: t("members.lastName@@Last name"),
  //     required: true,
  //   },
  //   {
  //     name: "dateOfBirth",
  //     type: "date",
  //     label: t("members.dateOfBirth@@Date of birth"),
  //   },
  // ];

  return (
    <Page class="flex-grow" title={t("members.newMember@@New member")}>
      <Form class="flex flex-grow flex-col justify-between">
        <div class="flex flex-col gap-4">
          <Field name="firstName">
            {(field, props) => (
              <InputField
                {...props}
                required
                label={t("members.firstName@@First name")}
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
          <Field name="lastName">
            {(field, props) => (
              <InputField
                {...props}
                required
                label={t("members.lastName@@Last name")}
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
          <Field name="dateOfBirth">
            {(field, props) => (
              <InputField
                {...props}
                label={t("members.dateOfBirth@@Date of birth")}
                type="date"
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
          <Field name="address">
            {(field, props) => (
              <InputField
                {...props}
                label={t("members.address@@Address")}
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
          <Field name="gender">
            {(field, props) => (
              <select {...props} value={field.value}>
                <option value="">{t("app.notSelected@@Not selected")}</option>
                {genders.value.map((gender) => (
                  <option key={gender.name} value={gender.id}>
                    {gender.name as string}
                  </option>
                ))}
              </select>
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
      <Members />
    </Speak>
  );
});

//TODO: add meta data
