import fs from 'fs';
import tableToObject from './components/func/tableToObject.js';
/*
*/
let path = '../588/';
// let serchDate = ;
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
        cvsDate = tableToObject(cvsDate).body;
        acc = acc.concat(cvsDate);
        //   .filter(item => {
        //   return item['Город'] === serchCity;
        // }));
      });
    }
    return acc;
  }, []);
/*
*/
console.log(dirContent.length)

