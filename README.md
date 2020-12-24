# send-email-all

## วิธีติดตั้ง
>หมายเหตุ ติดตั้ง nodejs ก่อน

### clone git
``` shell
git clone https://github.com/Iceberg-incorporation/send-email-all.git

cd send-email-all

chmod 700 install.macOS.bash
chmod 700 start.macOS.bash
chmod 700 install.linux.bash
chmod 700 start.linux.bash
```

### ติดตั้งแพคเกต

> สำหรับ macOS ให้เปิดไฟล์ชื่อ ```install.macOS.bash```

> สำหรับ Linux ให้เปิดไฟล์ชื่อ ```install.linux.bash```

> สำหรับ Windows ให้เปิดไฟล์ชื่อ ```install.windows.bash```

### วิธีใช้งาน

>นำไฟล์ excel เข้าไปใน folder ```docs`` 
>หมายเหตุ อ่านได้เฉพาะ ไฟล์สกุล xlsx

ระบบปฏิบัติการ Mac OS
>จากนั้น  ให้เปิดไฟล์ชื่อ ```start.macOS.bash``` สำหรับ 

ระบบปฏิบัติการ Linux
>จากนั้น  ให้เปิดไฟล์ชื่อ ```start.linux.bash``` สำหรับ 

ระบบปฏิบัติการ Windows
>จากนั้น  ให้เปิดไฟล์ชื่อ ```start.windows.bash``` สำหรับ 

### วิธีตั้งค่า หัวตาราง excel
>ให้ไปแก้ไขไฟล์ xlsx.headers.json

ตัวอย่าง ไฟล์
```json
{
    "A": "ลำดับ",
    "B": "ชื่อ",
    "C": "ประเภท",
    "D": "อีเมล",
    "E": "สถานะ",
    "F": "เวลา"
}
```

### วิธีตั้งค่า การส่ง email
>ให้ไปแก้ไขไฟล์ mail.setting.js

ตัวอย่าง ไฟล์ 
```javascript
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
```
