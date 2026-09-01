import { html } from "lit";

/** Neutral PASO path/step mark shared by the Control UI brand surfaces. */
export function renderPasoMark(className = "paso-mark") {
  return html`
    <svg class=${className} viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="#0e1015"></rect>
      <path
        d="M18 50V14H36C44.837 14 52 21.163 52 30C52 38.837 44.837 46 36 46H30"
        stroke="#e8590c"
        stroke-width="7"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M18 50H28V40H38V30H50"
        stroke="#faf9f7"
        stroke-width="5"
        stroke-linecap="square"
        stroke-linejoin="miter"
      ></path>
    </svg>
  `;
}
