export const formatDateTime = (timestamp) => {
  const dateTime = new Date(timestamp);

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return dateTime.toLocaleString("en-IN", options);
};
