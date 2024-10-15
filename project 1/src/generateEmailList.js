import {
  createElement,
  formatDateTime,
  handelEmailReadArea,
  manageSessionStore,
} from "./utils";

export const generateEmailList = (emailData, render) => {
  const emailLists = createElement({
    tag: "aside",
  });
  const { store, activeMail } = manageSessionStore();

  emailData &&
    emailData.list?.map((mail) => {
      const mailCurrentState = store({ mailId: mail.id });

      // putting initial value to session
      mailCurrentState || store({ mailId: mail.id, value: "default" });
      const emailElement = createElement({
        tag: "div",
        attribute: {
          style: ` margin-bottom:1rem; padding-inline:1rem; padding-block:0.3rem; display:flex; border-radius:5px; padding-block:0.5rem; ${
            mailCurrentState === undefined
              ? "background-color:#fff"
              : mailCurrentState.isRead
              ? "background-color:var(--bgRead)"
              : "background-color:#fff"
          }; border:1px solid var(--border);`,
          class: activeMail() === mail.id ? "active" : "",
        },
        children: [
          {
            tag: "div",
            attribute: {
              style:
                "flex-grow: 0;flex-shrink: 0; width:60px; padding-right:1rem;",
            },
            children: [
              {
                tag: "div",
                attribute: {
                  style:
                    "display:flex; justify-content: center; align-items: center; margin-inline:auto;  width:85%; aspect-ratio: 1/1;background-color:var(--accent); border-radius:100%; text-size:2rem; font-weight:semi-bold; color:#fff ",
                },
                children: mail.from?.name[0].toUpperCase(),
              },
            ],
          },

          {
            tag: "div",
            attribute: {
              style: "width: 100%; ",
            },
            children: [
              {
                tag: "p",
                attribute: {
                  style:
                    " width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word;",
                },
                children: [
                  {
                    tag: "span",
                    children: "From: ",
                  },
                  {
                    tag: "span",
                    children: mail.from.name,
                    attribute: {
                      style:
                        "color:var(--textBlack); font-weight:600; text-transform: capitalize;",
                    },
                  },
                  {
                    tag: "span",
                    attribute: {
                      style: "color:var(--textBlack); font-weight:600; ",
                    },
                    children: ` <${mail.from.email}>`,
                  },
                ],
              },
              {
                tag: "p",
                attribute: {
                  style:
                    " width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word; margin-top:0.3rem;",
                },
                children: [
                  {
                    tag: "span",
                    children: `Subject: `,
                  },
                  {
                    tag: "span",
                    attribute: {
                      style:
                        "color:var(--textBlack); font-weight:600; text-transform: capitalize;",
                    },
                    children: `${mail.subject}`,
                  },
                ],
              },
              {
                tag: "p",
                attribute: {
                  style:
                    " width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word;margin-top:0.5rem;",
                },
                children: `${mail.short_description}`,
              },
              {
                tag: "p",
                attribute: {
                  style:
                    " width: calc(100% - 60px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-word;margin-top:0.3rem; font-size:0.9rem;",
                },
                children: [
                  {
                    tag: "span",
                    children: formatDateTime(mail.date),
                  },
                  {
                    tag: "span",
                    attribute: {
                      id: `favorite-${mail.id}`,
                      style: `padding-left:1.5rem; color:var(--accent); font-weight:500; ${
                        mailCurrentState === undefined
                          ? "display:none; "
                          : mailCurrentState.isFavorite
                          ? "display:initial; "
                          : "display:none; "
                      }`,
                    },
                    children: "Favorite",
                  },
                ],
              },
            ],
          },
        ],
      });

      const handelClick = () => {
        store({ mailId: mail.id, value: { isRead: true } });
        activeMail(mail.id);
        render();
        handelEmailReadArea(mail);
      };

      emailElement.onclick = handelClick;

      emailLists.append(emailElement);
    });

  return emailLists;
};
