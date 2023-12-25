/*
Данные по сотрудникам
*/
import getDataEmpl from './getData.js';
import formtDateEmpl from "./formatDate.js";
import addingPropertiesEmpl from "./addProp.js";
import getSheetNames from "../func/getSheetsName.js";
import tableToObject from '../func/tableToObject.js';
/*
*/
export default async function (client, aimObject) {
  /*
  */
  const sheetNames = await getSheetNames(client, aimObject.sheetID);
  const arrDataRange = sheetNames.map(item => { return item + aimObject.sheetRange; });
  /*
  */
  return Promise
    .all(arrDataRange.map((dataRange, iter, thatArr) => {
      return getDataEmpl(client, aimObject.sheetID, dataRange); /* получение массива из таблиц */
    }))
    .then((arr = result.falt()) => {
      return arr.reduce((acc, item) => {
        return acc.concat(item); /* объединение в единый массив */
      }, []);
    })
    .then((res) => {
      return tableToObject(res); /* формирование из строк объектов */
    })
    .then((res) => {
      let q = formtDateEmpl(res);
      // console.log(q);
      return q; /* форматирование значений */
    });
}