export const manageSessionStore = () => {
  let storeData = JSON.parse(sessionStorage.getItem("store")) || {};

  const paginationPage = (page) => {
    if (page) {
      sessionStorage.setItem("paginationPage", page);
      return sessionStorage.getItem("paginationPage");
    } else {
      return sessionStorage.getItem("paginationPage");
    }
  };

  const isFiltered = (filteredBY) => {
    if (filteredBY) {
      sessionStorage.setItem("isFiltered", filteredBY);
      return sessionStorage.getItem("isFiltered");
    } else {
      return sessionStorage.getItem("isFiltered");
    }
  };

  const activeMail = (activeItem) => {
    if (!activeItem) {
      return sessionStorage.getItem("activeMail");
    } else {
      sessionStorage.setItem("activeMail", activeItem);
      return sessionStorage.getItem("activeMail");
    }
  };

  const store = ({ mailId, value } = {}) => {
    const prevState = JSON.parse(sessionStorage.getItem("store")) || {};

    if (mailId && value === "default") {
      const newState = {
        ...prevState,
        [mailId]: {
          isRead: false,
          isFavorite: false,
        },
      };
      sessionStorage.setItem("store", JSON.stringify(newState));
      return;
    } else if (value) {
      prevState[mailId] = { ...prevState[mailId], ...value };
      sessionStorage.setItem("store", JSON.stringify(prevState));
      return;
    } else if (mailId) {
      return prevState[mailId];
    } else {
      return prevState;
    }
  };

  return { store, isFiltered, activeMail, paginationPage };
};
