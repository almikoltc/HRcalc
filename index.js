
import fs from "fs";
import objectToTable from './components/func/objectToTable.js';
import tableToObject from './components/func/tableToObject.js';
import _progress from 'cli-progress';
import htmlTableResult from "./components/func/htmlTableResult.js";
/*
01. Указание периода расчёта, источника данных (таблица) и диапазон,
*/
import getAim from './components/period/createAimObject.js';
const aimObject = getAim({
  /* insert */
  year: 2023,
  month: 11,
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
//
const employeeRecordsData = await employeeRecordsFunc(client, aimObject);
const employeeRecords = Promise
  .all([employeeRecordsData, aimObject])
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
let calcResult = await Promise.all([aimObject, employeeRecords, questions]).then(
  ([aimObject, employeeRecords, questions]) => {
    /* вычисление */
    return calculation(questions, employeeRecords.body, aimObject.inputDate.toDateString());
  }
);
/*
Вывод результата
*/
htmlTableResult(calcResult.filter(item => {
  return item.city === "Тюмень" && item.post === "Специалист отдела продаж" && item.addres === null;
}));
console.log('Server start...');
// fs.writeFileSync("./Result.json", JSON.stringify(calcResult));
