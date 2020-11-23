const XTJ = require('./libs/xlsxToJson');
const JTX = require('./libs/jsonToXlsx')

XTJ('test_send_mail.xlsx').then(data => {

    const new_data = []
    // console.log(data);

    data.data.map(_data => {
        // new_data.push({ ..._data, ['สถานะ']: 1 })

        console.log(_data['อีเมล']);
    })

    // JTX('send_mail_history.xlsx', data.headers, new_data)

})

