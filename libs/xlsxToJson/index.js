var XLSX = require('xlsx');

function xlsxToJson(filename) {
    let promise = new Promise((resolve, reject) => {
        var workbook = XLSX.readFile(filename);
        var sheet_name_list = workbook.SheetNames;

        sheet_name_list.forEach(function (y) {
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            for (z in worksheet) {
                if (z[0] === '!') continue;
                //parse out the column, row, and value
                var tt = 0;
                for (var i = 0; i < z.length; i++) {
                    if (!isNaN(z[i])) {
                        tt = i;
                        break;
                    }
                };
                var col = z.substring(0, tt);
                var row = parseInt(z.substring(tt));
                var value = worksheet[z].v;

                //store header names
                if (row == 1 && value) {
                    headers[col] = value;
                    continue;
                }

                if (!data[row]) data[row] = {};
                data[row][headers[col]] = value;
            }
            //drop those first two rows which are empty
            data.shift();
            data.shift();

            // console.log(data);
            resolve({
                headers: headers,
                data: data
            })
        });
    })
    return promise
}

const XTJ = module.exports = exports = xlsxToJson;