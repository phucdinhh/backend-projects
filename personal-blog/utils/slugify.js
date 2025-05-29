export const slugify = (title, date) => {
  return `${dayjs(date)}-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
};
