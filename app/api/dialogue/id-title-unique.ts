export const formattedTitle = (title: string) => {
  const titleUrl = title
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\-]/g, "")
    .toLowerCase();
  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const uniqueTitle = `${titleUrl}-${randomSuffix}`;
  return uniqueTitle;
};
