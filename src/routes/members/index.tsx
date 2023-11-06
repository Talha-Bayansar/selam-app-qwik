import { component$ } from "@builder.io/qwik";
import { Speak } from "qwik-speak";

const Members = component$(() => {
  return <div>Members</div>;
});

export default component$(() => {
  return (
    <Speak>
      <Members />
    </Speak>
  );
});
