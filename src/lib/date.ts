const formatDate = (date: string) => {
  return new Date(date).toLocaleString("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export { formatDate };
