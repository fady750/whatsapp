export  function formatToHourAndMin(dateString: string): string {
  const date = new Date(dateString);

  // Convert to local time
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const formattedHour = hours % 12 || 12;

  // Pad minutes to 2 digits
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${formattedHour}:${formattedMinutes} ${ampm}`;
}