export function formatDateTimePretty(input?: string | Date): string {
  if (!input) return "";

  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date.getTime())) return "";

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${dayName}, ${day}-${month}-${year}, ${String(hours).padStart(2, "0")}:${minutes}${ampm}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Converts a YYYY-MM-DD string to an ISO 8601 string at UTC midnight
 * Example: "2026-05-23" -> "2026-05-23T00:00:00.000Z"
 */
export function convertToGoTimeUTC(dateStr: string): string {
  if (!dateStr) return "";

  // Appends midnight UTC template directly
  return `${dateStr}T00:00:00.000Z`;
}
