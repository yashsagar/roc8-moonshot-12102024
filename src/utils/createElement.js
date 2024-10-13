export default function createElement({
  tag = "div",
  attribute = {},
  content,
}) {
  const element = document.createElement(tag);
  const attributeKey = Object.keys(attribute);
  if (attributeKey.length) {
    attributeKey.map((key) => {
      element.setAttribute(key, attribute[key]);
    });
  }

  element.innerText = content;
  return element;
}
