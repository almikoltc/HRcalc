console.log('app running');

import { google } from "googleapis";
import objectToTable from './components/objectToTable.js';
import tableToObject from './components/tableToObject.js';

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

let employeeRecords;

employeeRecords: {
  let arrDataRange = [
    "1. 374. СПН 1/3!A2:J",
    "2. 374. СПН 2!A2:J",
    // '3. 374. МОП!A2:J',
    // '4. 374. СОА!A2:J',
    // '5. 374. МОА!A2:J',
    // '6. 374. АУП!A2:J'
  ];

  employeeRecords = Promise
    .all(
      arrDataRange.map((dataRange, iter, thatArr) => {
        return getDataEmpl(client, dataRange);
      })
    )
    .then((arr = [res1, res2, res3, res4, res5, res6]) => {
      return arr.reduce((acc, item, iter, thatArr) => {
        return acc.concat(item);
      }, []);
    })
    .then((res) => {
      return tableToObject(res);
    })
    .then((res) => {
      return formtDateEmpl(res);
    });


  employeeRecords = /* await */ Promise
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
  let questionsRanges = [
    "СПН!C:F",
    // 'МОП!C:F',
    // 'СОА!C:F',
    // 'МОА!C:F',
    // 'АУП!C:F',
  ];

  questions = /* await */ Promise
    .all(
      questionsRanges.map((questionRange) => {
        return getDataQu(client, questionRange);
      })
    )
    .then((res) => {
      res = res.flat();
      return tableToObject(res);
      // return res
    })
    .then((res) => {
      return addPropQu(res);
    });
}

/* calcResult */

import calculation from "./components/calcResult/calculation.js";

let calcResult;

calculation: {
  calcResult = await Promise.all([aimObject, employeeRecords, questions]).then(
    ([aimObject, personalInfo, questions]) => {
      return calculation(questions, personalInfo);
    }
  );
}

console.dir(calcResult);
