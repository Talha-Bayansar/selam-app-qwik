import { type HTMLInputTypeAttribute } from "@builder.io/qwik";
import { type Input, minLength, object, string } from "valibot";

export type TInputField = {
  name: "name";
  placeholder?: string;
  label: string;
  required?: boolean;
  type?: HTMLInputTypeAttribute;
};

export const GroupsFormSchema = object({
  name: string([minLength(1, "requiredField")]),
});

export type TGroupsForm = Input<typeof GroupsFormSchema>;
