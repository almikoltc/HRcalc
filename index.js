/* зависимости общего назначения */
import { google } from "googleapis";
import fs from "fs";
import objectToTable from './components/func/objectToTable.js';
import tableToObject from './components/func/tableToObject.js';
import _progress from 'cli-progress';
import htmlTableResult from "./components/func/htmlTableResult.js";
/* каталоги */
import cities from "./components/catalogs/cities.json" assert { type: 'json' };
import typesOfPosts from "./components/catalogs/typesOfPosts.json" assert { type: 'json' };
import indictors from "./components/catalogs/indictors.json" assert { type: 'json' };
/* авторизация */
import keys from "./components/keys.json" assert { type: 'json' };
let client;
client: {
  client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
  client.authorize((err, tokens) =>
  {
    if (err) {
      console.log("Authorization err");
    } else {
      console.log("Authorization OK");
    }
  });
}
/* указание периода расчёта */
// import getDataAim from './components/period/getData.js';
import getAim from './components/period/createAimObject.js';
let aimObject;
period: {
  aimObject = getAim({
    year: 2023 /* Ввод */,
    month: 10 /* Ввод */,
  });
}
/* данные по сотрудникам */
import getDataEmpl from './components/employeeRecords/getData.js';
import formtDateEmpl from "./components/employeeRecords/formatData.js";
import addingPropertiesEmpl from "./components/employeeRecords/addProp.js";
import getSheetNames from "./components/func/getSheetsName.js";
let dataEmployeeRecords;
let employeeRecords;
employeeRecords: {
  // let sheetNames = await getSheetNames(client, "10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM");
  let sheetNames = await getSheetNames(client, "1Tgfh3utS2njkqLzST91Ys_szmLNRJGXh3SZbCQcrIqY");
  let arrDataRange = sheetNames.map(item =>
  {
    return item + '!A2:N';
  });
  dataEmployeeRecords = Promise
    .all(arrDataRange.map((dataRange, iter, thatArr) =>
    {
      return getDataEmpl(client, dataRange); /* получение массива из таблиц */
    }))
    .then((arr = result.falt()) =>
    {
      return arr.reduce((acc, item, iter, thatArr) =>
      {
        return acc.concat(item);  /* объединение в единый массив */
      }, []);
    })
    .then((res) =>
    {
      return tableToObject(res); /* формирование из строк объектов */
    });
  employeeRecords = dataEmployeeRecords
    .then((res) =>
    {
      return formtDateEmpl(res); /* форматирование значений */
    });
  employeeRecords = Promise
    .all([employeeRecords, aimObject])
    .then(([employeeRecords, aimObject]) =>
    {
      return addingPropertiesEmpl(employeeRecords, aimObject); /* расчёт и добавления новых свойст для фильтрации */
    });
}
/* формирование списка показателей */
// import getDataQu from './components/questions/getData.js';
import addPropQu from "./components/questions/addProp.js";
let questions;
questions: {
  questions = dataEmployeeRecords
    .then((res) =>
    {
      uniqueCitisNamesandAddres: {
        let thisIterationCities = [...new Set(res.body.map(item => { return item["Город"]; }))];
        let newCitiesName = [];
        let update = false;
        /* Формирование списка городов */
        let curCity = cities.map(item =>
        {
          return item.city;
        });
        thisIterationCities.map(item =>
        {
          if (!curCity.includes(item)) {
            update = true;
            newCitiesName.push({ city: item, addres: [] });
          }
        });
        let resArr = [...cities, ...newCitiesName];
        /* формирование дополнительных адресов по каждому городу */
        resArr.forEach(item =>
        {
          let adr = res.body.map(item_ =>
          {
            if (item_['Город'] === item.city) {
              return item_['Дополнительный рабочий адрес'];
            }
          });
          adr = [...new Set(adr)];
          adr.map(item_ =>
          {
            if (!item.addres.includes(item_) && item_ !== undefined) {
              update = true;
              item.addres.push(item_);
            }
          });
        });
        /* формирование перечня показателей: город х адрес х тип долности */
        let allQuestionsHead = [];
        allQuestionsHead: {
          let techArr = [null];
          [...new Array(12).keys()].map((itm, i) =>
          {
            techArr.push(new Date(2023, i, 1).toDateString());
          });
          console.log(techArr);

          resArr.forEach(item =>
          {
            item.addres.forEach(addres =>
            {
              typesOfPosts.forEach(post =>
              {
                indictors.forEach(indicator =>
                {
                  techArr.forEach(monthGroup =>
                  {
                    allQuestionsHead.push({
                      "Город": item.city,
                      "Дополнительный рабочий адрес": addres === 'null' ? null : addres,
                      "Тип должности": post,
                      "Показатель": indicator,
                      "Месяц найма": monthGroup,
                    });
                  });
                });
              });
            });
          });
        }
        console.log("Сalculated values: " + allQuestionsHead.length);
        // htmlTableResult(allQuestionsHead);
        return allQuestionsHead;
      }
    })
    .then((res) =>
    {
      return addPropQu(res); /* добавление дополнительных свойств для перечня показателей */
    });
}
/* вычисление значения показателей */
import calculation from "./components/calc/calculation.js";
let calcResult;
calculation: {
  calcResult = await Promise.all([aimObject, employeeRecords, questions]).then(
    ([aimObject, employeeRecords, questions]) =>
    {
      // htmlTableResult(employeeRecords.body.slice(0, 1000));
      return calculation(questions, employeeRecords.body); /* вычисление */
    }
  );
}
/* html таблица */
htmlTable: {
  htmlTableResult(calcResult.filter(item =>
  {
    return item.city === "Тюмень" && item.post === "Специалист отдела продаж" && item.addres === null;
  }));
  console.log('Server start...');
}
