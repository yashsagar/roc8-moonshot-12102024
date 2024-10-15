import { createElement, manageSessionStore } from "./utils";
import { generateEmailList } from "./generateEmailList";
import { generateEmailReadArea } from "./generateEmailReadArea";

const app = createElement({
  tag: "main",
  attribute: {
    style:
      "padding:2rem; background: var(--bgDefault); min-height:100vh;  color:var(--text)",
  },
});

// variable block (like state in react)
const { store, activeMail, isFiltered, paginationPage } = manageSessionStore();

let emailLists;
let filteredEmailList;

activeMail(0); // setting active mail to 0

paginationPage(1); // setting the default page for data fetch at the time first load
const totalpage = 2; // since there is only two page i aam setting hard code value if there is more data we have to update based on logic

let fetching = false; // To prevent multiple fetches at once

function handelFilter(block) {
  isFiltered() === block ? isFiltered("undefined") : isFiltered(block);
  render();
}

// data fetching block

function fetchData(url = `https://flipkart-email-mock.now.sh/?page=1`) {
  fetching = true; // Set fetching state to true to avoid multiple fetch call
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      !emailLists
        ? (emailLists = data)
        : (emailLists.list = [...emailLists.list, ...data.list]);
      fetching = false; // Reset fetching state after data is added
      render();
    })
    .catch((error) => {
      console.error("Error fetching email data:", error);
      fetching = false; // Reset fetching state on error
    });
}
emailLists || fetchData(); // initial fetch call

// scroll pagination implimantation

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    const currentPage = parseInt(paginationPage());
    if (!fetching && currentPage < totalpage) {
      paginationPage(currentPage + 1);
      const url = `https://flipkart-email-mock.now.sh/?page=${currentPage + 1}`;
      fetchData(url);
    }
  }
});

// scroll pagination impliment issue#1 when you filter mail and thouse list create scroll that also trigger the scroll pagination logic
// need corret in future

function render() {
  const filteredBY = isFiltered();

  // filtering the data if isfilter is not undefind
  if (filteredBY != "undefined" && filteredBY && emailLists) {
    // reading the session store and making filterList
    const storeData = store();
    const list = Object.keys(storeData);
    const filterList = [];

    switch (filteredBY) {
      case "unread": {
        list.forEach((mailId) => {
          !storeData[mailId].isRead && filterList.push(mailId);
        });

        break;
      }
      case "read": {
        list.forEach((mailId) => {
          storeData[mailId].isRead && filterList.push(mailId);
        });
        break;
      }
      case "favorite": {
        list.forEach((mailId) => {
          storeData[mailId].isFavorite && filterList.push(mailId);
        });
        break;
      }
    }

    // filtering the data and updatining the filteredEmailList

    filteredEmailList = { list: [] };

    emailLists.list.forEach((mail) => {
      filterList.includes(mail.id) && filteredEmailList.list.push(mail);
    });
  } else {
    filteredEmailList = emailLists;
  }
  // end of filtering logic

  // creating HTML element
  const wrapper = createElement({
    tag: "div",
    attribute: {
      style: "max-width:1600px; width:94%; margin-inline:auto;",
    },
  });
  //filter element block
  const filter = createElement({
    tag: "div",
    attribute: {
      style:
        "display: flex; gap:1rem; padding-bottom:1rem; align-items: center; ",
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
        filteredBY === "unread" && "background:var(--bgFilterBtn)"
      }; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px; cursor:pointer;`,
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
        filteredBY === "read" && "background:var(--bgFilterBtn)"
      }; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;cursor:pointer;`,
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
        filteredBY === "favorite" && "background:var(--bgFilterBtn)"
      }; padding-inline:0.9rem; padding-block:0.3rem; border-radius:20px;cursor:pointer;`,
    },
    children: "Favorites",
  });

  favorites.onclick = () => {
    handelFilter("favorite");
  };

  filter.append(unread, read, favorites);

  wrapper.append(filter);
  const section = createElement({
    tag: "section",
    attribute: {
      class: "wrapper",
      id: "wrapper",
    },
  });
  section.append(generateEmailList(filteredEmailList, render));
  section.append(generateEmailReadArea());

  wrapper.append(section);

  app.replaceChildren(wrapper);
}

render();

export default app;
