const fs = require('fs');
const bsm = require('blackboard-send-mail')
const key = require('./blackboard-app-296106-a6a06a8dba96.json')

const senderEmailAddress = "contact@blackboardapp.co";

bsm.connect({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: senderEmailAddress,
        serviceClient: key.client_id,
        privateKey: key.private_key
    }
}).then(_data => {
    console.log(_data);
})

function writeAsync(mail) {

    const _mail = `${mail}`
    fs.writeFileSync(`send_mail_history.txt`, _mail, 'utf-8', function (err) {
        if (err) throw err;
        console.log('filelistAsync complete');
    });
}

function Send(mail) {

    const html = fs.readFileSync('index.html', 'utf-8');


    const data = {
        from: senderEmailAddress,
        to: mail,
        subject: "ทดสอบ 2",
        html: `${html}`
    }

    bsm.sendMail(data).then(_data => {
        console.log(_data);
        writeAsync(mail)
        console.log('ส่งอีเมลสำเร็จ', _data);
        if (_data) {

        }
    }).catch(err => {
        console.log('ส่งอีเมลผิดพลาด', err);
    })
}

function readAsync() {
    const data = fs.readFileSync('send_mail.txt', 'utf-8');
    var j = data.split('\n')
    // console.log(j);
    return j

}

const all_mail = readAsync();

all_mail.map(_mail => {
    // console.log(_mail);
    Send(_mail)
})


