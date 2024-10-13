import { createElement } from "./utils";

export default function generateEmailReadArea(load) {
  return createElement({
    tag: "p",
    children: "generateEmailReadArea",
    attribute: {
      id: "read-area",
      class: "hidden",
    },
  });
}
