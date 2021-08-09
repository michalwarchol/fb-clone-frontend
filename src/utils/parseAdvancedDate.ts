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
  let date = new Date(parseInt(timestamp));
  let now = new Date();

  //if today
  if (
    date.getFullYear() == now.getFullYear() &&
    date.getMonth() == now.getMonth() &&
    date.getDay() == now.getDay()
  ) {
    let rowValue = now.getTime() - date.getTime();
    let seconds = rowValue / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    if (hours >= 1) return Math.floor(hours) + "h";
    if (minutes >= 1) return Math.floor(minutes) + "m";
    if (seconds >= 1) return Math.floor(seconds) + "s";
    if (seconds < 1) return "now";
  }

  //if yesterday
  if (
    date.getFullYear() == now.getFullYear() &&
    date.getMonth() == now.getMonth() &&
    date.getDay() == now.getDay() - 1
  ) {
    let hours = date.getHours();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return "Yesterday at " + hours + ":" + minutes + " " + ampm;
  }

  //if this year
  if(date.getFullYear() == now.getFullYear()){
    return months[date.getMonth()] + " " + date.getDay();
  }

  //if whenever
  return months[date.getMonth()] + " " + date.getDay()+", " + date.getFullYear();

};
