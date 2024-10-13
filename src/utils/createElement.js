export function createElement({ tag = "div", attribute = {}, children = "" }) {
  const element = document.createElement(tag);
  const attributeKey = Object.keys(attribute);
  if (attributeKey.length) {
    attributeKey.map((key) => {
      element.setAttribute(key, attribute[key]);
    });
  }

  if (typeof children === "object") {
    children.map((child) => {
      element.append(createElement(child));
    });
  } else {
    element.innerText = children;
  }

  return element;
}
