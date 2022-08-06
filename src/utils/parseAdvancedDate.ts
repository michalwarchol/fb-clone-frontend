const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const parseAdvancedDate = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  const now = new Date();

  //if today
  if (
    date.getFullYear() == now.getFullYear() &&
    date.getMonth() == now.getMonth() &&
    date.getDate() == now.getDate()
  ) {
    const rowValue = now.getTime() - date.getTime();
    const seconds = rowValue / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    if (hours >= 1) return Math.floor(hours) + "h";
    if (minutes >= 1) return Math.floor(minutes) + "m";
    if (seconds >= 1) return Math.floor(seconds) + "s";
    if (seconds < 1) return "now";
  }

  //if yesterday
  if (
    date.getFullYear() == now.getFullYear() &&
    date.getMonth() == now.getMonth() &&
    date.getDate() == now.getDate() - 1
  ) {
    let hours = date.getHours();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return "Yesterday at " + hours + ":" + minutes + " " + ampm;
  }

  //if this year
  if(date.getFullYear() == now.getFullYear()){
    return months[date.getMonth()] + " " + date.getDate();
  }

  //if whenever
  return months[date.getMonth()] + " " + date.getDate()+", " + date.getFullYear();

};
