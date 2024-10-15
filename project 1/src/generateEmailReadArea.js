import { createElement } from "./utils";

export const generateEmailReadArea = () => {
  return createElement({
    tag: "section",
    attribute: {
      class: "hidden",
      id: "read-area",
      style:
        "border:1px solid var(--border); height: fit-content; padding:1rem; border-radius:5px; display:flex; gap:1rem;",
    },
  });
};
