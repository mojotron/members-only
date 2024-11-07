import { formatDistance } from "date-fns";

const timeDistance = (timestamp: string) => {
  return formatDistance(new Date(timestamp), new Date(), { addSuffix: true });
};

export { timeDistance };
