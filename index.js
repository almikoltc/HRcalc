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
import indictors from "./components/catalogs/indictors.js";
/* указание периода расчёта */
import getAim from './components/period/createAimObject.js';
const aimObject = getAim({
/* insert */  year: 2023,
/* insert */  month: 10,
/* insert */  id: '10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM',
});
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

/* данные по сотрудникам */
import getDataEmpl from './components/employeeRecords/getData.js';
import formtDateEmpl from "./components/employeeRecords/formatData.js";
import addingPropertiesEmpl from "./components/employeeRecords/addProp.js";
import getSheetNames from "./components/func/getSheetsName.js";
// employeeRecords: {
const sheetNames = await getSheetNames(client, aimObject.sheetID);
let arrDataRange = sheetNames.map(item => { return item + '!A2:N'; });
let dataEmployeeRecords;
dataEmployeeRecords = Promise
  .all(arrDataRange.map((dataRange, iter, thatArr) =>
  {
    return getDataEmpl(client, aimObject.sheetID, dataRange); /* получение массива из таблиц */
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
let employeeRecords;
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
// }
/* формирование списка показателей */
// import getDataQu from './components/questions/getData.js';
import addPropQu from "./components/questions/addProp.js";
let questions;
questions: {
  questions = dataEmployeeRecords
    .then((res) =>
    {
      let thisIterationCities = [...new Set(res.body.map(item => { return item["Город"]; }))];
      let newCitiesName = [];
      /* Формирование списка городов */
      let curCity = cities.map(item =>
      {
        return item.city;
      });
      thisIterationCities.map(item =>
      {
        if (!curCity.includes(item)) {
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
            item.addres.push(item_);
          }
        });
      });
      /* формирование перечня показателей: город х адрес х тип долности */
      let allQuestionsHead = [];
      /*  */
      let techArr = [null];
      [...new Array(12).keys()].map((itm, i) =>
      {
        techArr.push(new Date(2023, i, 1).toDateString());
      });
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
      console.log("Сalculated values: " + allQuestionsHead.length);
      // htmlTableResult(allQuestionsHead);
      return allQuestionsHead;
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
      return calculation(questions, employeeRecords.body, aimObject.inputDate.toDateString()); /* вычисление */
    }
  );
  /* Вывод результата */
  // fs.writeFileSync("./Result.json", JSON.stringify(calcResult));
}
/* html таблица */
htmlTable: {
  htmlTableResult(calcResult.filter(item =>
  {
    return item.city === "Тюмень" && item.post === "Специалист отдела продаж" && item.addres === null;
  }));
  console.log('Server start...');
}
