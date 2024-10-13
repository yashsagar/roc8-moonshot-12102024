import { createElement } from "./utils";
import generateEmailList from "./generateEmailList";
import generateEmailReadArea from "./generateEmailReadArea";

const app = createElement({
  tag: "main",
  attribute: {
    style: "padding:2rem; background: var(--bgDefault); min-height:100vh",
  },
});

// variable block (like state in react)
let activeFilter = "";
let emailLists;
let dataPage = 1;

function handelFilter(block) {
  activeFilter = block;
  render();
}

emailLists ||
  (function fetchData(url) {
    if (!url) url = `https://flipkart-email-mock.now.sh/?page=${dataPage}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        emailLists ? emailLists.list?.push(data) : (emailLists = data);
        render();
      });
  })();

function render() {
  const fragment = document.createDocumentFragment();
  //filter block
  const filter = createElement({
    tag: "div",
    attribute: {
      style:
        "display: flex; gap:1rem; padding-bottom:1rem; align-items: center;",
    },
    children: [
      {
        tag: "span",
        children: "Filter By:",
      },
    ],
  });

  const unread = createElement({
    tag: "div",
    attribute: {
      style: `${
        activeFilter === "unread" && "background:var(--bgFilterBtn)"
      }; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;`,
    },
    children: "Unread",
  });
  unread.onclick = () => {
    handelFilter("unread");
  };

  const read = createElement({
    tag: "div",
    attribute: {
      style: `${
        activeFilter === "read" && "background:var(--bgFilterBtn)"
      }; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;`,
    },
    children: "Read",
  });

  read.onclick = () => {
    handelFilter("read");
  };

  const favorites = createElement({
    tag: "div",
    attribute: {
      style: `${
        activeFilter === "favorite" && "background:var(--bgFilterBtn)"
      }; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;`,
    },
    children: "Favorites",
  });

  favorites.onclick = () => {
    handelFilter("favorite");
  };

  filter.append(unread, read, favorites);

  fragment.append(filter);
  const section = createElement({
    tag: "section",
    attribute: {
      class: "wrapper",
    },
  });
  section.append(generateEmailList(emailLists));
  section.append(generateEmailReadArea());

  fragment.append(section);

  app.replaceChildren(fragment);
}

render();

export default app;
