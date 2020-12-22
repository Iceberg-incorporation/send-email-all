const fs = require('fs');
const bsm = require('blackboard-send-mail')
const key = require('./blackboard-app-296106-a6a06a8dba96.json')
const XTJ = require('./libs/xlsxToJson');
const JTX = require('./libs/jsonToXlsx');
const RFX = require('./libs/resertFileXlsx');
const UE = require('./libs/uniqueEmail')
const UEH = require('./libs/uniqueEmailHistory')
const mail_from = "contact@blackboardapp.co";
const mail_subject = "WELCOME TO BLACKBOARD APP"

bsm.connect({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: mail_from,
        serviceClient: key.client_id,
        privateKey: key.private_key
    }
}).then(_data => {
    // console.log(_data);
})


function Send(mail, xlsx) {

    const __html = fs.readFileSync('templates/index.html', 'utf-8');


    const data = {
        from: `"Blackboard App" <${mail_from}>`,
        to: mail,
        subject: mail_subject,
        // text: 'ลองคลิก https://www.blackboardapp.co',
        html: __html,
        // html: `
        // <iframe src="https://www.w3schools.com/" style="height:200px;width:300px" title="Iframe Example"></iframe>
        // `
    }

    bsm.sendMail(data).then(_data => {

        const new_data = [];
        xlsx.data.map(_data => {
            new_data.push({ ..._data, ['สถานะ']: 1 })
        })

        JTX(`output/${new Date()}.xlsx`, xlsx.headers, new_data);
        JTX(`history/main.xlsx`, xlsx.headers, new_data)

        console.log('ส่งอีเมลสำเร็จ', _data);
        if (_data) {

        }
    }).catch(err => {
        console.log('ส่งอีเมลผิดพลาด', err);
    })




}



function Start() {
    UEH(__dirname + '/' + 'history' + '/' + 'main.xlsx',__dirname + '/' + 'docs').then(unique_email_history => {
        console.log(unique_email_history);
    })
}
Start()



