console.log('app running');

/* global import */

import { google } from "googleapis";
import fs from "fs";
import objectToTable from './components/objectToTable.js';
import tableToObject from './components/tableToObject.js';

/* catalogs */

import cities from "./components/catalogs/cities.json" assert { type: 'json' };
import typesOfPosts from "./components/catalogs/typesOfPosts.json" assert { type: 'json' };
import indictors from "./components/catalogs/indictors.json" assert { type: 'json' };

/* autorization */

import keys from "./components/keys.json" assert { type: 'json' };

let client;

client: {
  client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  client.authorize((err, tokens) => {
    if (err) {
      console.log("Err!");
    } else {
      console.log("Connect");
    }
  });
}

/* aim */

import getDataAim from './components/aimObject/getData.js';
import getAim from './components/aimObject/createAimObject.js';

let aimObject;

aimObject: {
  aimObject = getDataAim(client, "СПН!A1:XX1")
    .then((data) => {
      return getAim({
        year: 2023 /* Ввод */,
        month: 9 /* Ввод */,
        data: data /* Ввод */,
      });
    })
    .then((data) => {
      return data;
    });
}

/* employeeRecords */

import getDataEmpl from './components/employeeRecords/getData.js';
import formtDateEmpl from "./components/employeeRecords/formatData.js";
import addingPropertiesEmpl from "./components/employeeRecords/addProp.js";
import getSheetNames from "./components/getSheetsName.js";

let dataEmployeeRecords;
let employeeRecords;

employeeRecords: {

  let sheetNames = await getSheetNames(client, "10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM");

  let arrDataRange = sheetNames.map(item => {
    return item + '!A2:Z';
  });

  dataEmployeeRecords = Promise
    .all(
      arrDataRange.map((dataRange, iter, thatArr) => {
        return getDataEmpl(client, dataRange);
      })
    )
    .then(
      (arr = result.falt()) => {
        return arr.reduce((acc, item, iter, thatArr) => {
          return acc.concat(item);
        }, []);
      }
    )
    .then(
      (res) => {
        return tableToObject(res);
      }
    );

  employeeRecords = dataEmployeeRecords
    .then(
      (res) => {
        return formtDateEmpl(res);
      }
    );

  employeeRecords = Promise
    .all([employeeRecords, aimObject])
    .then(
      ([employeeRecords, aimObject]) => {
        return addingPropertiesEmpl(employeeRecords, aimObject);
      }
    );
}

/* questions */

import getDataQu from './components/questions/getData.js';
import addPropQu from "./components/questions/addProp.js";

let questions;

questions: {

  questions = dataEmployeeRecords
    .then((res) => {

      uniqueCitisNamesandAddres: {

        let thisIterationCities = [...new Set(res.body.map(item => { return item["Город"]; }))];
        let newCitiesName = [];
        let update = false;

        /* проверка списка городов */

        let curCity = cities.map(item => {
          return item.city;
        });

        thisIterationCities.map(item => {
          if (!curCity.includes(item)) {
            update = true;
            newCitiesName.push({ city: item, addres: [] });
          }
        });

        let resArr = [...cities, ...newCitiesName];

        /* проверка полноты адресов */

        resArr.forEach(item => {

          let adr = res.body.map(item_ => {
            if (item_['Город'] === item.city) {
              return item_['Дополнительный рабочий адрес'];
            }
          });

          adr = [...new Set(adr)];

          adr.map(item_ => {
            if (!item.addres.includes(item_) && item_ !== undefined) {
              update = true;
              item.addres.push(item_);
            }
          });

        });

        /* обновление списка уникальных пар город - адрес */

        if (update) {
          fs.writeFileSync('./components/catalogs/cities.json', JSON.stringify(resArr));
          console.log('update cities list');
        } else {
          console.log('cities list not update');
        }

        let allQuestionsHead = [];

        allQuestionsHead: {

          resArr.forEach(item => {
            item.addres.forEach(addres => {
              typesOfPosts.forEach(post => {
                indictors.forEach(indicator => {
                  allQuestionsHead.push({
                    "Город": item.city,
                    "Дополнительный рабочий адрес": addres,
                    "Тип должности": post,
                    "Показатель": indicator
                  });
                });
              });
            });
          });
        }
        console.log(allQuestionsHead.length);
        return allQuestionsHead;
      }
    }).then((res) => {
      return addPropQu(res);
    });
}

/* calcResult */

import calculation from "./components/calcResult/calculation.js";

let calcResult;

calculation: {
  calcResult = await Promise.all([aimObject, employeeRecords, questions]).then(
    ([aimObject, personalInfo, questions]) => {
      return calculation(questions, personalInfo.body);
    }
  );
}

console.dir(calcResult);
