import { formatDistance, getDate } from "date-fns";

const timeDistance = (timestamp: string) => {
  return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
};

const dateCreated = (timestamp: string) => {
  return Intl.DateTimeFormat("us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(timestamp));
};

export { timeDistance, dateCreated };
