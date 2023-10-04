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
import getSheetNames from "./components/employeeRecords/getSheetsName.js";

let employeeRecords;

employeeRecords: {
  let sheetNames = await getSheetNames(client, "10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM");

  let arrDataRange = sheetNames.map(item => {
    return item + '!A2:J';
  });

  employeeRecords = Promise
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
    )
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
  let questionsRanges = [
    "СПН!C:F",
    // 'МОП!C:F',
    // 'СОА!C:F',
    // 'МОА!C:F',
    // 'АУП!C:F',
  ];

  questions = Promise
    .all(
      questionsRanges.map((questionRange) => {
        return getDataQu(client, questionRange);
      })
    )
    .then((res) => {
      res = res.flat();
      return tableToObject(res);
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
