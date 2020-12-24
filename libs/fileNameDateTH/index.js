const d = new Date()
const monthNamesThai = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
const dayNames = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

const fileNameDateTH = `${dayNames[d.getDay()]} ${d.getDate()} ${monthNamesThai[d.getMonth()]} ${d.getFullYear()}, ${d.getHours() }/${d.getMinutes() } น`;

module.exports = fileNameDateTH