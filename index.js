
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
  id: '1j-JzuXBzIQPYWB8iviX9gGBe9PTgie1QMe-oGHk5Gqo',
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
// console.log(objectToTable(employeeRecords));
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
    // console.log(employeeRecords.body);
    let er = employeeRecords.body.filter(item => {
      return item['Город'] === "Тюмень";
    });
    // console.log(er);
    inSheet(client, "1E9qq8uZM8t-2LYJ6y2xdETVUaPwNqm4-ZlDb9ZkWA6k", "Данные", [employeeRecords.head, ...objectToTable({ head: Object.keys(er[0]), body: er }).body]);
    return calculation(questions, employeeRecords.body, aimObject.inputDate.toDateString());
  });
/*
06. Запись результата
*/
fs.writeFileSync("./data/Result.json", JSON.stringify(calcResult));
/*
07. Запуск сервера
*/
// htmlTableResult(calcResult.filter(item => {
//   return item.city === "Тюмень" && item.post === "Специалист отдела продаж" && item.addres === null;
// }));
/*
08. Передача в таблицу для формирования отчета
*/
import inSheet from "./components/export/inSheet.js";
calcResult = [["city", "addres", "post", "indicator", "value"], ...objectToTable({
  head: ["city", /* "group", */ "addres", "post", "indicator", "value"],
  body: calcResult
}).body];
inSheet(client, "1E9qq8uZM8t-2LYJ6y2xdETVUaPwNqm4-ZlDb9ZkWA6k", "Декабрь 2023", calcResult)


