/*
Данные по сотрудникам
*/
import getDataEmpl from './getData.js';
import formtDateEmpl from "./formatData.js";
import addingPropertiesEmpl from "./addProp.js";
import getSheetNames from "../func/getSheetsName.js";
import tableToObject from '../func/tableToObject.js';
/*
*/
export default async function (client, aimObject) {
  /*
  */
  const sheetNames = await getSheetNames(client, aimObject.sheetID);
  let arrDataRange = sheetNames.map(item => { return item + aimObject.sheetRange; });
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
      return formtDateEmpl(res); /* форматирование значений */
    });
  /*
  */
  // employeeRecords = Promise
  //   .all([employeeRecords, aimObject])
  //   .then(([employeeRecords, aimObject]) => {
  //     return addingPropertiesEmpl(employeeRecords, aimObject); /* добавления новых свойст для фильтрации */
  //   });
  /*
  */
}