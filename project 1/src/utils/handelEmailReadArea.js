import { createElement, formatDateTime, manageSessionStore } from "../utils";

const memo = {};

export const handelEmailReadArea = async (mail) => {
  const { store } = manageSessionStore();

  let mailData;
  if (memo[mail.id]) {
    mailData = memo[mail.id];
  } else {
    const res = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${mail.id}`
    );
    const data = await res.json();
    mailData = data;
    // adding mail data to memo object it will reduce the fetch call if client read same mail twice
    memo[mail.id] = data;
  }

  const wrapperEl = document.getElementById("wrapper");
  const readAreaEl = document.getElementById("read-area");
  const UpdatedEmailReadArea = createElement({
    tag: "section",
    attribute: {
      id: "read-area",
      class: "read-area",
      style:
        "border:1px solid var(--border); height: fit-content; padding:2rem ; border-radius:5px; display:flex; gap:1rem; background-color:#fff; min-width: 200px; position: sticky; top: 2rem; max-height: 90vh; overflow-y: scroll;",
    },
  });

  const avatar = createElement({
    tag: "div",
    attribute: {
      style:
        "display:flex; justify-content: center; align-items: center; align-self: flex-start; margin-inline:auto;  width:40px; aspect-ratio: 1/1;background-color:var(--accent); border-radius:100%; text-size:2rem; font-weight:semi-bold; color:#fff; flex-shrink: 0; flex-grow: 0; ",
    },
    children: mail.from?.name[0].toUpperCase(),
  });

  const textWrapper = createElement({
    tag: "div",
  });

  const topPartText = createElement({
    tag: "div",
    attribute: {
      style: "position: relative;",
    },
    children: [
      {
        tag: "p",
        children: mail.subject,
        attribute: {
          style: "font-size:1.6rem; font-weight:500; padding-bottom:0.8rem",
        },
      },
      {
        tag: "p",
        children: formatDateTime(mail.date),
        attribute: {
          style: "font-size:0.8rem;  padding-bottom:0.8rem",
        },
      },
    ],
  });

  const { isFavorite } = store({ mailId: mail.id });
  const favorite = createElement({
    tag: "p",
    children: isFavorite ? "Remove from favorite" : "Mark as favorite",
    attribute: {
      style:
        "position: absolute; background-color: var(--accent); color:#fff; top:0.3rem; right:1rem; padding-block:0.4rem; padding-inline:1.2rem; border-radius:20px; font-size:0.8rem;  cursor: pointer;",
    },
  });

  favorite.onclick = (event) => {
    const { isFavorite: prevState } = store({ mailId: mail.id });
    store({ mailId: mail.id, value: { isFavorite: !prevState } });
    const favorite = document.getElementById(`favorite-${mail.id}`);
    !prevState
      ? ((favorite.style.display = "initial"),
        (event.target.innerText = "Remove from favorite"))
      : ((favorite.style.display = "none"),
        (event.target.innerText = "Mark as favorite"));
  };

  topPartText.append(favorite);

  const range = document.createRange();
  const textFragment = range.createContextualFragment(mailData.body);

  Object.assign(textFragment.firstChild.style, {
    display: "flex",
    "flex-direction": "column",
    gap: "1.5rem",
    "padding-bottom": "2rem",
  });

  textWrapper.append(topPartText, textFragment);
  UpdatedEmailReadArea.append(avatar, textWrapper);

  wrapperEl.replaceChild(UpdatedEmailReadArea, readAreaEl);
};
