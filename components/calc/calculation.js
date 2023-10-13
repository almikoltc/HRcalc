import _progress from 'cli-progress';
import fs from "fs";
export default function calculation(arrQuery, arrObjects) {
   let groupedArr = {};
   groupedArr: {
      arrObjects.map(item => {
         if (groupedArr[item["Город"]] === undefined) {
            groupedArr[item["Город"]] = [];
         }
         groupedArr[item["Город"]].push(item);
      }
      );
   }
   const pb = new _progress.Bar({
      barCompleteChar: '█',
      barIncompleteChar: '|',
      format: 'Расчёт значений: {bar} {percentage}%',
      fps: 10,
      stream: process.stdout,
      barsize: 20
   });
   pb.start(arrQuery.length, 0);
   return arrQuery.map((elQ, i) => {
      pb.update(i + i);
      arrQuery.length === i + 1 ? pb.stop() : true;
      calc: {
         let result = groupedArr[elQ["Город"]];
         if (result === undefined) {
            return {
               city: elQ["Город"],
               addres: elQ["Дополнительный рабочий адрес"],
               post: elQ["Тип должности"],
               indicator: elQ["Показатель"],
               value: 0,
            };
         }
         for (let key in elQ) {
            result = filter(key, elQ[key], result);
         }
         let res = result.length;
         return {
            city: elQ["Город"],
            addres: elQ["Дополнительный рабочий адрес"],
            post: elQ["Тип должности"],
            indicator: elQ["Показатель"],
            value: res,
         };
      }
   });
};
/* блок функций */
function filter(key, value, arr) {
   if (value === null || key === "Показатель") {
      return arr;
   }
   return arr.filter(el => {
      return el[key] === value;
   });
}