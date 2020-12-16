const fs = require('fs');
const bsm = require('blackboard-send-mail')
const key = require('./blackboard-app-296106-a6a06a8dba96.json')
const XTJ = require('./libs/xlsxToJson');
const JTX = require('./libs/jsonToXlsx');
const mail_from = "contact@blackboardapp.co";
const mail_subject = "WELCOME TO BLACKBOARD APP"

bsm.connect({
    host: 'win02-mailpro.zth.netdesignhost.com',
    secure: false,
    auth: {
        user: "admin@iceberg-th.com",
        pass: "1fkhr8@CC"
    }
}).then(_data => {
    console.log(_data);
})

// bsm.connect({
//     service: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: mail_from,
//         pass: "iceberg2563",
//         serviceClient: key.client_id,
//         privateKey: key.private_key
//     }
// }).then(_data => {
//     console.log(_data);
// })

// bsm.connect({
//     service: 'gmail',
//     // port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2',
//         user: mail_from,
//         pass: "iceberg2563",
//         serviceClient: key.client_id,
//         privateKey: key.private_key
//     }
// }).then(_data => {
//     console.log(_data);
// })



function Send(mail, xlsx) {

    const __html = fs.readFileSync('index.html', 'utf-8');


    const data = {
        from: `"Blackboard App" <${mail_from}>`,
        to: mail,
        subject: mail_subject,
        html: __html
    }

    bsm.sendMail(data).then(_data => {

        const new_data = [];
        xlsx.data.map(_data => {
            new_data.push({ ..._data, ['สถานะ']: 1 })
        })

        JTX('send_mail_history.xlsx', xlsx.headers, new_data)

        console.log('ส่งอีเมลสำเร็จ', _data);
        if (_data) {

        }
    }).catch(err => {
        console.log('ส่งอีเมลผิดพลาด', err);
    })




}


XTJ('send_mail.xlsx').then(all_mail => {
    all_mail.data.map(_mail => {
        Send(_mail['อีเมล'], all_mail)
    })
})



