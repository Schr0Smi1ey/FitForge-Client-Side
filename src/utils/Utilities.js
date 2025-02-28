export const convertDate = (date, page) => {
  const dt = new Date(date);
  const formattedDate = dt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  if (page === "AddForum") {
    return formattedDate;
  }
  const formattedTime = dt.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} ${formattedTime}`;
};
