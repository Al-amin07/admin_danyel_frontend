export function formatDateToDDMMYY(isoDate: Date | string): string {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}

export function formatDateToAgo(isoDate: string) {
  const date = new Date(isoDate);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));

  // Check if the date is today
  const isToday = now.toDateString() === date.toDateString();

  if (isToday) {
    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes} min ago`;
    return `${hours} hr ago`;
  } else {
    // Format older dates like "17 June, 2025 3:50 pm"
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const formatted = date.toLocaleString("en-US", options);
    const parts = formatted.split(", ");
    // Remove comma before time and lowercase am/pm
    return `${parts[0]}, ${parts[1]} ${parts[2].toLowerCase()}`;
  }
}
