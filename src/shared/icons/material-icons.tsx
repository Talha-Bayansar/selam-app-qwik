import { type QwikIntrinsicElements } from "@builder.io/qwik";

type IconProps = {
  size?: number;
  color?: string;
} & QwikIntrinsicElements["svg"];

export function MaterialSymbolsPerson(props: IconProps, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 16}
      height={props.size ?? 16}
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill={props.color ?? "currentColor"}
        d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12Zm-8 8v-2.8q0-.85.438-1.563T5.6 14.55q1.55-.775 3.15-1.163T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20H4Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsGroupsSharp(props: IconProps, key: string) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 16}
      height={props.size ?? 16}
      viewBox="0 0 24 24"
      {...props}
      key={key}
    >
      <path
        fill={props.color ?? "currentColor"}
        d="M0 18v-1.575q0-1.1 1.113-1.763Q2.225 14 4 14q.325 0 .625.012q.3.013.575.063q-.35.5-.525 1.075q-.175.575-.175 1.225V18Zm6 0v-1.625q0-1.625 1.663-2.625q1.662-1 4.337-1q2.7 0 4.35 1q1.65 1 1.65 2.625V18Zm13.5 0v-1.625q0-.65-.163-1.225q-.162-.575-.487-1.075q.275-.05.563-.063Q19.7 14 20 14q1.8 0 2.9.662q1.1.663 1.1 1.763V18ZM4 13q-.825 0-1.412-.588Q2 11.825 2 11q0-.85.588-1.425Q3.175 9 4 9q.85 0 1.425.575Q6 10.15 6 11q0 .825-.575 1.412Q4.85 13 4 13Zm16 0q-.825 0-1.413-.588Q18 11.825 18 11q0-.85.587-1.425Q19.175 9 20 9q.85 0 1.425.575Q22 10.15 22 11q0 .825-.575 1.412Q20.85 13 20 13Zm-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.138Q10.75 6 12 6q1.275 0 2.137.862Q15 7.725 15 9q0 1.25-.863 2.125Q13.275 12 12 12Z"
      ></path>
    </svg>
  );
}