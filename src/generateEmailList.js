import { createElement } from "./utils";

export default function generateEmailList(emailData) {
  const emailLists = createElement({
    tag: "aside",
  });
  console.log(emailData);

  emailData &&
    emailData.list?.map((mail) => {
      const emailElement = createElement({
        tag: "div",
        children: [
          {
            tag: "p",
            children: `From:${mail.from?.email}`,
          },
          {
            tag: "p",
            children: `Subject:${mail.subject}`,
          },
          {
            tag: "p",
            children: `${mail.short_description}`,
            attribute: {
              //   style: "text-overflow: ellipsis; white-space: pre;",
            },
          },
          {
            tag: "p",
            children: `${mail.date}`,
          },
        ],
      });

      emailElement.onclick = () => {
        const readAreaEl = document.getElementById("read-area");
        readAreaEl.classList.remove("hidden");
        readAreaEl.classList.add("read-area");
        console.log(mail.id);
      };

      emailLists.append(emailElement);
    });

  return emailLists;
}
