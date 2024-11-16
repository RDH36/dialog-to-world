// Importer dayjs, relativeTime et locale français
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("fr");

export const formatDateFromNow = (date: Date) => {
  return dayjs(date).fromNow();
};
