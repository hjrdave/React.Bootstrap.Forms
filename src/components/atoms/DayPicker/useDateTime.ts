import { DateTime } from "luxon";

const useDateTime = () => {
  const formatDate = (date: Date, dateStringFormat?: string) =>
    DateTime.fromJSDate(date).toFormat(dateStringFormat ?? "MM/dd/yyyy");

  return {
    formatDate,
  };
};

export default useDateTime;
