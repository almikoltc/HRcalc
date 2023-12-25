
import fs, { copyFileSync } from "fs";
import objectToTable from './components/func/objectToTable.js';
import tableToObject from './components/func/tableToObject.js';
import _progress from 'cli-progress';
import htmlTableResult from "./components/func/htmlTableResult.js";
import exportToSheet from "./components/func/exportToSheet.js";

/*
01. Указание периода расчёта, источника данных (таблица) и диапазон,
*/
import getAim from './components/period/createAimObject.js';
const aimObject = getAim({
  year: 2023,
  month: 12,
  id: '10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM',
  range: '!A2:N',
});
/*
02. Aвторизация
*/
import authorization from "./components/authorization.js";
const client = authorization();
/*
03. Парсинг данных по сотрудникам; добавление новых свойств
*/
import employeeRecordsFunc from './components/employeeRecords/_index.js';
import addPropertiesEmpl from "./components/employeeRecords/addProp.js";
const employeeRecordsData = await employeeRecordsFunc(client, aimObject);
const employeeRecords = Promise.all([employeeRecordsData, aimObject])
  .then(([employeeRecordsData, aimObject]) => {
    return addPropertiesEmpl(employeeRecordsData, aimObject);
  });
/*
04. Формирование списка показателей для расчета
*/
import questionsFunc from './components/indicators/_index.js';
let questions = questionsFunc(employeeRecords);
/*
05. Вычисление значения показателей
*/
import calculation from "./components/calc/calculation.js";
let calcResult = await Promise.all([aimObject, employeeRecords, questions])
  .then(([aimObject, employeeRecords, questions]) => {
    return calculation(questions, employeeRecords.body, aimObject.inputDate.toDateString());
  });
/*
06. Запись результата
*/
fs.writeFileSync("./data/Result.json", JSON.stringify(calcResult));
/*
07. Запуск сервера
*/
htmlTableResult(calcResult.filter(item => {
  return item.city === "Тюмень" && item.post === "Специалист отдела продаж" && item.addres === null;
}));
console.log('Server start...');

// /*
// 07. Формирование итоговой таблицы
// */
// let offset = new Date().getTimezoneOffset() / 60;
// let files = fs.readdirSync('./data', (err, file) => { return file; });
// /*
// */
// let resArr = [];
// files.map(item => {
//   // console.log(item);
//   let file = fs.readFileSync('./data/' + item);
//   file = JSON.parse(file);
//   file = file.filter(item => { return item.gpoup == null && item.post == 'Специалист отдела продаж'; });
//   resArr = [...resArr, ...file];
// });
// /*
// */
// let resBorder = [];
// {
//   let uniqCities = [...new Set(resArr.map(item => {
//     return item.city;
//   }))];
//   let unicIndicator = [
//     "Численность, всего",
//     "Численность в гр.0",
//     "Уволено в гр.0",
//     "Численность, всего без гр.0",
//     "Численность - 1 мес, без гр.0",
//     "Численность - 2 мес, без гр.0",
//     "Численность - 3 мес, без гр.0",
//     "Численность - 4 мес, без гр.0",
//     "Численность - 5 мес, без гр.0",
//     "Численность - 6 мес, без гр.0",
//     "Численность - 7-12 мес, без гр.0",
//     "Численность - 6 мес +, без гр.0",
//     "Численность - 12 мес +, без гр.0",
//     "Уволено - 1-2 нед, без гр.0",
//     "Уволено, всего, без гр.0",
//     "Уволено - 1 мес, без гр.0",
//     "Уволено - 2 мес, без гр.0",
//     "Уволено - 3 мес, без гр.0",
//     "Уволено - 4 мес, без гр.0",
//     "Уволено - 5 мес, без гр.0",
//     "Уволено - 6 мес, без гр.0",
//     "Уволено - 7-12 мес, без гр.0",
//     "Уволено - 6 мес +, без гр.0",
//     "Уволено - 12 мес +, без гр.0"
//   ];
//   uniqCities.map(item => {
//     unicIndicator.forEach(item_ => {
//       resBorder = [...resBorder, [item, item_]];
//     });
//   });
// }
// /*
// */
// let col = ['Город', 'Тип должности'];
// let headResTab = [
//   'Sun Jan 01 2023',
//   'Wed Feb 01 2023',
//   'Wed Mar 01 2023',
//   'Sat Apr 01 2023',
//   'Mon May 01 2023',
//   'Thu Jun 01 2023',
//   'Sat Jul 01 2023',
//   'Tue Aug 01 2023',
//   'Fri Sep 01 2023',
//   'Sun Oct 01 2023',
//   'Wed Nov 01 2023',
//   'Fri Dec 01 2023'
// ];
// /*
// */
// let unicCalcDate = [...new Set(resArr.map(item => {
//   return item.calcDate;
// }))];
// let res = [];
// {
//   resBorder.forEach((item, i) => {
//     console.log(i / resBorder.length);
//     let [city, indicator] = item;
//     let body = headResTab.map(date => {
//       let currResArr = resArr.filter(item_ => {
//         return (item_.city == city);
//       });
//       let itemRes = currResArr.filter(item_ => {
//         return (item_.city == city && item_.indicator == indicator && item_.calcDate == date);
//       })[0];
//       if (itemRes == undefined) {
//         return 0;
//       } else {
//         return itemRes.value;
//       }
//     });
//     // console.log(body);
//     res.push([city, indicator, ...body]);
//   });
// }
// // console.log(res);.
// exportToSheet(client, [[...col, ...headResTab], ...res], "Специалист отдела продаж");
