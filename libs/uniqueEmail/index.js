const XTJ = require('../xlsxToJson');
const RFX = require('../resertFileXlsx');

function uniqueEmail(dir_docs) {
    return new Promise((resolve, reject) => {
        RFX(dir_docs).then(files => {
            const file_arr = []
            var all_arr = [];
            var a;
            files.map((_file, index) => {
                const json_arr = [];

                XTJ(dir_docs + '/' + _file).then(all_mail => {
                    all_mail.data.map((_mail, key) => {
                        json_arr.push({
                            'ลำดับ': key,
                            'ชื่อ': _mail['ชื่อ'],
                            'ประเภท': _mail['ประเภท'],
                            'อีเมล': _mail['อีเมล'],
                            'สถานะ': _mail['สถานะ']
                        });
                        // Send(_mail['อีเมล'], all_mail)

                    })
                    file_arr.push(json_arr)
                    all_arr = all_arr.concat(json_arr)
                    const new_data_arr = [];
                    const new_mail_arr = []; // เก็บอีเมลที่คัดกรอง ที่ไม่ซ้ำกัน

                    if (files.length === index + 1) {
                        all_arr.map((_all_arr, _key_arr) => {
                            const main_email = _all_arr['อีเมล']


                            // console.log(new_mail_arr.indexOf(main_email));
                            if (new_mail_arr.indexOf(main_email) === -1) {
                                new_mail_arr.push(main_email)
                                new_data_arr.push({ ..._all_arr, ['ลำดับ']: _key_arr + 1, })
                                // console.log(`new_data_arr:`, new_data_arr);
                                resolve(new_data_arr)
                            }
                        })
                    }


                })


            })


        })
    })


}

const UE = module.exports = exports = uniqueEmail;