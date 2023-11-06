import { component$ } from "@builder.io/qwik";
import { Speak } from "qwik-speak";

const Groups = component$(() => {
  return <div>Groups page</div>;
});

export default component$(() => {
  return (
    <Speak>
      <Groups />
    </Speak>
  );
});
