const fs = require('fs');

 function resertFileXlsx(filename) {

    return new Promise((resolve, reject) => {
        let _type_file = '';
        let _name_file = '';
        const _file_all = [];
    
        fs.readdir(filename, (err, files) => {
            files.forEach(file => {
                _type_file = file.slice(file.length - 5, file.length);
                _name_file = file.slice(0, -5);
                console.log(file, _type_file.startsWith('.xlsx'), _name_file);
    
                if (_type_file.startsWith('.xlsx')) {
                    _file_all.push(`${_name_file}${_type_file}`)
                    resolve(_file_all)
                }
    
            });
        });

        
    })
 
};
const RFX = module.exports = exports = resertFileXlsx;