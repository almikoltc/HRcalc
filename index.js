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
import typesOfPosts from "./components/catalogs/typesOfPosts.json" assert { type: 'json' };
/*
Указание периода расчёта
*/
import getAim from './components/period/createAimObject.js';
const aimObject = getAim({
  /* insert */  year: 2023,
  /* insert */  month: 11,
  /* insert */  id: '1rjaA3msOpY4Q9K2cap4KMvYRqGXRCUuD1fMeyqe12EQ',
  /* insert */  range: '!A2:N',
});
/*
Aвторизация
*/
import authorization from "./components/authorization.js";
let client = authorization();
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
let arrDataRange = sheetNames.map(item => { return item + aimObject.sheetRange; });
/*
*/
let employeeRecords = Promise
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
  })
  // /*
  // */
  // let employeeRecords = dataEmployeeRecords
  .then((res) => {
    /* форматирование значений */
    return formtDateEmpl(res);
  });
/*
*/
employeeRecords = Promise
  .all([employeeRecords, aimObject])
  .then(([employeeRecords, aimObject]) => {
    /* добавления новых свойст для фильтрации */
    return addingPropertiesEmpl(employeeRecords, aimObject);
  });

console.log(employeeRecords);
/*
Формирование списка показателей
*/
import indictorsBase from "./components/catalogs/indictorsBase.js";
import indictorsPerMon from "./components/catalogs/indictorsPerMon.js";
import addPropQu from "./components/questions/addProp.js";
let questions = dataEmployeeRecords
  .then((res) => {
    /*
    Формирование списка городов
    */
    let citiesName = [...new Set(res.body.map(item => { return item["Город"]; }))]
      .map(item => {
        return { city: item, addres: [] };
      });
    /*
    Формирование дополнительных адресов по каждому городу
    */
    citiesName.forEach(item => {
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
    /* месяца групп найма */
    let periodArr = [null];
    [...new Array(12).keys()].map((itm, i) => {
      periodArr.push(new Date(2023, i, 1).toDateString());
    });
    /*
    */
    /* с аналитикой по группе найма */
    citiesName.forEach(item => { /* город */
      item.addres.forEach(addres => { /* адрес */
        typesOfPosts.forEach(post => { /* тип должности */
          indictorsPerMon.forEach(indicator => { /* вид показателя */
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
    /* без аналитике по группе найма */
    citiesName.forEach(item => { /* город */
      item.addres.forEach(addres => { /* адрес */
        typesOfPosts.forEach(post => { /* тип должности */
          indictorsBase.forEach(indicator => { /* вид показателя */
            // periodArr.forEach(monthGroup => { /* группа найма */
            let currItem = {
              "Город": item.city,
              "Дополнительный рабочий адрес": addres === 'null' ? null : addres,
              "Тип должности": post,
              "Показатель": indicator,
              // "Месяц найма": monthGroup
            };
            allQuestionsHead.push(currItem);
          });
          // });
        });
      });
    });
    citiesName = null;
    console.log("Сalculated values: " + allQuestionsHead.length);
    return allQuestionsHead;
  })
  .then((res) => {
    /* добавление дополнительных свойств */
    return addPropQu(res);
  });
// }
/*
Вычисление значения показателей
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
// fs.writeFileSync("./Result.json", JSON.stringify(calcResult));
console.log('Server start...');
