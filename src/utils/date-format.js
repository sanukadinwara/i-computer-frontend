export default function getFormattedDate(isoString) {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const sriLankaDate = new Date(date.getTime() + (5 * 60 + 30) * 60 * 1000);

    const day = date.getDate();
    const weekday = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const time = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    function getOrdinal(n) {
        if (n > 3 && n < 21) return `${n}th`;
        switch (n % 10) {
            case 1:
                return `${n}st`;
            case 2:
                return `${n}nd`;
            case 3:
                return `${n}rd`;
            default:
                return `${n}th`;
        }
    }

    return `${getOrdinal(day)} ${weekday} of ${month} ${time}`;
}