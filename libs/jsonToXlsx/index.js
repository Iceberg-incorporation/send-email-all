const XLSX = require('xlsx');

function jsonToXlsx(filename, headers, _data) {

    return new Promise((resolve, reject) => {


        let finalHeaders = Object.values(headers);
        let data = [_data]

        function writeFileQ(workbook, filename) {
            // return new Promise((resolve, reject) => {
            // the interface wasn't clearly documented, but this reasonable guess worked...
            XLSX.writeFileAsync(filename, workbook, (error, result) => {
                (error) ? reject(error) : resolve(result);
            })
            // })
        }

        data.forEach((array, i) => {
            let ws = XLSX.utils.json_to_sheet(array, { header: finalHeaders });
            let wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, "SheetJS")
            let exportFileName = filename;
            // XLSX.writeFile(wb, exportFileName)
            writeFileQ(wb, exportFileName)
            // .then(_data => {
            //     resolve(_data)
            // }).const(err => {
            //     reject(err)
            // })
        });
    })
}

const JTX = module.exports = exports = jsonToXlsx;