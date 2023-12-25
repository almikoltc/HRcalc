/*
Формирование списка показателей
*/
import indictorsBase from "./indictorsBase.js";
import indictorsPerMon from "./indictorsPerMon.js";
import addPropQu from "./addProp.js";
import typesOfPosts from "../catalogs/typesOfPosts.js" /* assert { type: 'json' } */;
/*
*/
export default async function (employeeRecords) {
  return employeeRecords
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
              // });
            });
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
}