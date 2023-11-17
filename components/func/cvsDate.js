import fs from 'fs';
import tableToObject from './tableToObject.js';
/*
*/
export default function (path, month, year) {
  let dirContent = fs.readdirSync(path, { withFileTypes: true })
    .reduce((acc, item, i, arr) => {
      if (item.isDirectory()) {
        fs.readdirSync(path + item.name).map(item_ => {
          let cvsDate = fs.readFileSync(path + item.name + '/' + item_ + '/', 'utf-8');
          cvsDate = cvsDate
            .split("\n")
            .map(item => {
              return item.split(';');
            });
          cvsDate = tableToObject(cvsDate).body
            .filter(item => {
              return item["Дата (Год - Месяц)"] === `${year} - ${month}`;
            });

          acc = acc.concat(cvsDate);
        });
      }
      return acc;
    }, []);
  /*
  */
  return dirContent;
}

