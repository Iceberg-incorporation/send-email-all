
const XTJ = require('../xlsxToJson');
const UE = require('../uniqueEmail')

function uniqueEmailHistory(file_history,dir_docs) {
    return new Promise((resolve, reject) => {
        XTJ(file_history).then(h_mail => {
            // const f_mail = h_mail.data.indexOf(find_email => find_email['อีเมล'] === console.log(find_email['อีเมล']))
            const new_data_arr = [];
            const new_mail_arr = []; // เก็บอีเมลที่คัดกรอง ที่ไม่ซ้ำกัน
            h_mail.data.map((_h_mail, index_h) => {
                const main_email = _h_mail['อีเมล']
                new_mail_arr.push(main_email)

                if (h_mail.data.length === index_h + 1) {
                    // console.log(new_mail_arr);

                    UE(dir_docs).then(unique_email => {
                        // const new_unique_email = []
                        // console.log(unique_email);

                        unique_email.map((_u_e, index_u_e) => {
                            const main_unique_email = _u_e['อีเมล'];
                            //    new_unique_email.push(main_unique_email);
                            if (new_mail_arr.indexOf(main_unique_email) === -1) {
                                new_data_arr.push({ ..._u_e, ['ลำดับ']: index_u_e + 1, })
                                resolve(new_data_arr)
                                // console.log(`new_data_arr:`, new_data_arr);
                            }

                        })
                    })
                }
            })

        }).catch(err => {
            console.log('history err', err);
        })
    })
}

const UEH = module.exports = exports = uniqueEmailHistory;