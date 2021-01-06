const fs = require('fs');
const dotenv = require('dotenv');
const bsm = require('blackboard-send-mail');
const config = require('./config');
const XTJ = require('./libs/xlsxToJson');
const JTX = require('./libs/jsonToXlsx');
const UEH = require('./libs/uniqueEmailHistory');
const dateTH = require('./libs/dateTH');
const fileNameDateTH = require('./libs/fileNameDateTH');
const headers = require('./xlsx.headers.json');
const mail = require('./mail.setting');

dotenv.config();

bsm.connect(config).then(_data => {
    console.log(_data);
});


function Send(mail_to, xlsx) {
    return new Promise((resolve, reject) => {
        const __html = fs.readFileSync(`templates/${mail.html_file_name}`, 'utf-8');


        const data = {
            from: mail.from,
            to: mail_to,
            subject: mail.subject,
            html: __html,

        }

        XTJ(__dirname + '/' + 'history' + '/' + 'main.xlsx').then(_history => {
            const new_data = [];

            xlsx.data.map((_data, key) => {
                new_data.push({
                    ..._data,
                    ['ลำดับ']: key + 1,
                    ['สถานะ']: 1,
                    ['เวลา']: dateTH
                })
            });

            JTX(`output/${fileNameDateTH}.xlsx`, xlsx.headers, new_data).then(_data => {
                // console.log(`output/${dateTH}.xlsx`, 'success');
                const new_history = []
                const data_history = _history.data.concat(new_data)

                data_history.map((_format_data, index) => {
                    new_history.push({
                        ..._format_data,
                        ['ลำดับ']: index + 1,
                        ['สถานะ']: 1,
                        ['เวลา']: dateTH
                    })
                })

                if (new_history.length === data_history.length) {
                    JTX(`history/main.xlsx`, xlsx.headers, new_history).then(_succes => {
                        console.log(`history/main.xlsx`, 'success');
                    }).catch(err => {
                        // console.log(`history/main.xlsx`, 'error', err);
                    })
                }


            }).catch(err => {
                // console.log(`output/${dateTH}.xlsx`, 'error', err);
            });


        })

        bsm.sendMail(data).then(_data => {

            // console.log('ส่งอีเมลสำเร็จ', _data);
            // if (_data) {
            resolve({ message: "ส่งอีเมลสำเร็จ", mail: _data.accepted })
            // }
        }).catch(err => {
            reject({ message: "ส่งอีเมลผิดพลาด", error: err })
            // console.log('ส่งอีเมลผิดพลาด', err);
        })

    })
}



function Start() {
    UEH(__dirname + '/' + 'history' + '/' + 'main.xlsx', __dirname + '/' + 'docs').then(unique_email_history => {
        unique_email_history.map(_data => {
            // console.log(_data['อีเมล']);
            Send(_data['อีเมล'], { headers: headers, data: unique_email_history })
            // .then(_success => {
            //     console.log(_success.message, _success.mail);
            // }).catch(err => {
            //     console.log(err.message, err.error);
            // })
        })
    })
}

Start()



