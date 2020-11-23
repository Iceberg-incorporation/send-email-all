const fs = require('fs');
const bsm = require('blackboard-send-mail')
const key = require('./blackboard-app-296106-a6a06a8dba96.json')

const mail_from = "contact@blackboardapp.co";
const mail_subject = "WELCOME TO BLACKBOARD APP"

bsm.connect({
    service:"gmail",
    auth:{
        user:mail_from,
        pass:"iceberg2563"
    }
}).then(_data => {
    console.log(_data);
})

function writeAsync(mail) {


    fs.writeFileSync(`send_mail_history.txt`, mail + "\n", {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    }, function (err) {
        if (err) throw err;
        console.log('filelistAsync complete');
    });
}

function Send(mail) {

    const html = fs.readFileSync('index.html', 'utf-8');


    const data = {
        from: `"BlackboardApp" <${mail_from}>`,
        to: mail,
        subject: mail_subject,
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


