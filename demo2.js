import fs from 'fs';
// let readableStream = fs.createReadStream("./588.json", "utf-8");
// readableStream.on("data", function (chunk) {
//   console.log(chunk);
// });
/*
*/
let dirContent = fs
  .readdirSync('../588/ф1_3/')
  .reduce((acc, item, i) => {
    let currVal =
      fs
        .readFileSync("../588/ф1_3/588-2212-2301-2302.csv", "utf8")
        .split("\n")
        .map(item => {
          return item.split(';');
        });
    acc = acc.concat(currVal);
    console.log(acc.length);
    return acc;
  }, []);
console.log(dirContent.length);
/*
*/
let dirContent2 = fs
  .readdirSync('../588/ф2/')
  .reduce((acc, item, i) => {
    let currVal = fs
      .readFileSync("../588/ф1_3/588-2212-2301-2302.csv", "utf8")
      .split("\n")
      .map(item => {
        return item.split(';');
      });
    acc = acc.concat(currVal);
    console.log(acc.length);
    return acc;
  }, []);
/*
*/
import tableToObject from './components/func/tableToObject.js';
dirContent = dirContent.concat(dirContent2)/* .slice(0, 10) */;
dirContent2 = null;
dirContent = tableToObject(dirContent);
console.log(dirContent);
/*
*/
// fs.writeFileSync("./588.json", JSON.stringify(dirContent));
/*
*/


