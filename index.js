/*
Зависимости общего назначения
 */
import { google } from "googleapis";
import fs from "fs";
import objectToTable from './components/func/objectToTable.js';
import tableToObject from './components/func/tableToObject.js';
import _progress from 'cli-progress';
import htmlTableResult from "./components/func/htmlTableResult.js";
/*
Каталоги
 */
// import cities from "./components/catalogs/cities.json" assert { type: 'json' };
import typesOfPosts from "./components/catalogs/typesOfPosts.json" assert { type: 'json' };
import indictors from "./components/catalogs/indictors.js";
/*
Указание периода расчёта
 */
import getAim from './components/period/createAimObject.js';
const aimObject = getAim({
/* insert */  year: 2023,
/* insert */  month: 10,
/* insert */  id: '1rjaA3msOpY4Q9K2cap4KMvYRqGXRCUuD1fMeyqe12EQ',
});
/*
Aвторизация
 */
import keys from "./components/keys.json" assert { type: 'json' };
let client;
client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);
client.authorize((err, tokens) => {
  if (err) {
    console.log("Authorization err");
  } else {
    console.log("Authorization OK");
  }
});
/*
Данные по сотрудникам
 */
import getDataEmpl from './components/employeeRecords/getData.js';
import formtDateEmpl from "./components/employeeRecords/formatData.js";
import addingPropertiesEmpl from "./components/employeeRecords/addProp.js";
import getSheetNames from "./components/func/getSheetsName.js";
/*
 */
const sheetNames = await getSheetNames(client, aimObject.sheetID);
let arrDataRange = sheetNames.map(item => { return item + '!A2:N'; });
let dataEmployeeRecords = Promise
  .all(arrDataRange.map((dataRange, iter, thatArr) => {
    /* получение массива из таблиц */
    return getDataEmpl(client, aimObject.sheetID, dataRange);
  }))
  .then((arr = result.falt()) => {
    return arr.reduce((acc, item, iter, thatArr) => {
      /* объединение в единый массив */
      return acc.concat(item);
    }, []);
  })
  .then((res) => {
    /* формирование из строк объектов */
    return tableToObject(res);
  });
/*
 */
let employeeRecords = dataEmployeeRecords
  .then((res) => {
    /* форматирование значений */
    return formtDateEmpl(res);
  });
employeeRecords = Promise
  .all([employeeRecords, aimObject])
  .then(([employeeRecords, aimObject]) => {
    /* добавления новых свойст для фильтрации */
    return addingPropertiesEmpl(employeeRecords, aimObject);
  });
/*
Формирование списка показателей
 */
import addPropQu from "./components/questions/addProp.js";
let questions = dataEmployeeRecords
  .then((res) => {
    /*
    Формирование списка городов
     */
    let newCitiesName = [...new Set(res.body.map(item => { return item["Город"]; }))]
      .map(item => {
        return { city: item, addres: [] };
      });
    /*
    Формирование дополнительных адресов по каждому городу
    */
    newCitiesName.forEach(item => {
      let adr = res.body.map(item_ => {
        if (item_['Город'] === item.city) {
          return item_['Дополнительный рабочий адрес'];
        }
      });
      adr = [...new Set(adr)];
      adr.map(item_ => {
        if (!item.addres.includes(item_) && item_ !== undefined) {
          item.addres.push(item_);
        }
      });
    });
    /*
    Формирование перечня показателей: город * адрес * тип долности * показатель
     */
    let allQuestionsHead = [];
    let periodArr = [null];
    /* месяца групп найма */
    [...new Array(12).keys()].map((itm, i) => {
      periodArr.push(new Date(2023, i, 1).toDateString());
    });
    newCitiesName.forEach(item => { /* город */
      item.addres.forEach(addres => { /* адрес */
        typesOfPosts.forEach(post => { /* тип должности */
          indictors.forEach(indicator => { /* вид показателя */
            periodArr.forEach(monthGroup => { /* группа найма */
              let currItem = {
                "Город": item.city,
                "Дополнительный рабочий адрес": addres === 'null' ? null : addres,
                "Тип должности": post,
                "Показатель": indicator,
                "Месяц найма": monthGroup
              };
              allQuestionsHead.push(currItem);
            });
          });
        });
      });
    });
    console.log("Сalculated values: " + allQuestionsHead.length);
    // htmlTableResult(allQuestionsHead);
    return allQuestionsHead;
  })
  .then((res) => {
    return addPropQu(res); /* добавление дополнительных свойств для перечня показателей */
  });
// }
/*
Вычисление значения показателей
 */
import calculation from "./components/calc/calculation.js";
let calcResult = await Promise.all([aimObject, employeeRecords, questions]).then(
  ([aimObject, employeeRecords, questions]) => {
    return calculation(questions, employeeRecords.body, aimObject.inputDate.toDateString()); /* вычисление */
  }
);
/*
Вывод результата
*/
htmlTableResult(calcResult.filter(item => {
  return item.city === "Тюмень" && item.post === "Специалист отдела продаж" && item.addres === null;
}));
// fs.writeFileSync("./Result.json", JSON.stringify(calcResult));
console.log('Server start...');
