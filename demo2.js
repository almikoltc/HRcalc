import fs from 'fs';
// let readableStream = fs.createReadStream("./ignor/588.json", "utf-8");
// readableStream.readableObjectMode;
// readableStream.on("data", function (chunk) {
//   console.log(chunk);
// });
/*
*/
// let dirContent =
//   fs.readdirSync('../588/ф1_3/')
//     .reduce((acc, item, i) => {
//       let currVal = fs
//         .readFileSync('../588/ф1_3/' + item, "utf8")
//         .split("\n")
//         .map(item => {
//           return item.split(';');
//         });
//       acc = acc.concat(currVal);
//       console.log(acc.length);
//       return acc;
//     }, []);
// console.log(dirContent.length);
/*
*/
let dirContent =
  fs.readdirSync('../588/ф2/')
    .reduce((acc, item, i) => {
      let currVal = fs
        .readFileSync('../588/ф2/' + item, "utf8")
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
import tableToObject from './components/func/tableToObject.js';
// dirContent = dirContent.concat(dirContent2)/* .slice(0, 10) */;
// dirContent2 = null;
dirContent = tableToObject(dirContent);
console.log(dirContent);
/*
*/
fs.writeFileSync("./588f2.json", JSON.stringify(dirContent));
/*
*/


