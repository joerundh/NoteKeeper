function getFormattedDate(date) {
    let str = `${date.getDate()} ${date.toLocaleDateString("en-gb", {year: "numeric", month: "long"})}, `;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    str += `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return str;
}