import { type HTMLInputTypeAttribute } from "@builder.io/qwik";
import { type Input, minLength, nullable, object, string } from "valibot";

export type TInputField = {
  name: "firstName" | "lastName" | "dateOfBirth" | "address" | "gender";
  placeholder?: string;
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
};

export const FormSchema = object({
  firstName: string([minLength(1, "requiredField")]),
  lastName: string([minLength(1, "requiredField")]),
  dateOfBirth: nullable(string()),
  address: nullable(string()),
  gender: string(),
});

export type MembersForm = Input<typeof FormSchema>;
