import { createElement } from "./utils";

const app = createElement({
  tag: "div",
  attribute: {
    style: "background-color :red; border: 1px solid pink;",
  },
  content: "testing",
});

export default app;
