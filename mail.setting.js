/**
 * วิธีใช้งาน
 *? ตั้งค่าการส่ง e-mail
 * TODO from : กำหนด e-mail ต้นทาง
 * TODO subject: กำหนด หัวเรื่อง
 * TODO html_file_name: กำหนดชื่อไฟล์ template ที่ต้องการจะส่ง
 */

const mail = {
    from: `"Blackboard App" <contact@blackboardapp.co>`,
    subject: "WELCOME TO BLACKBOARD APP",
    html_file_name: "index.html"
}

module.exports = mail;