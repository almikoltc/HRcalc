// var objects = require("./app_data/логи.json").RECORDS
import fs from "fs";
import objectsI from "./Логи для скипта.json" assert { type: 'json' };
import positions_typesI from "./positions_types.json" assert { type: 'json' };
import positionsI from "./positions.json" assert { type: 'json' };

let objects = objectsI.RECORDS;
let positions_types = positions_typesI.RECORDS;
let positions = positionsI.RECORDS;

formatingData: {

  changeTimeFormat: {
    objects = objects.map((item, iter, thatArr) => {
      let dArr = item.time.split(/\D/);
      item._time = new Date(
        dArr[2], dArr[1] - 1, dArr[0], dArr[3], dArr[4], dArr[5]
      );
      let offsetTimeZone = item._time.getTimezoneOffset();
      item.time = new Date(
        dArr[2], dArr[1] - 1, dArr[0], dArr[3], dArr[4] - offsetTimeZone, dArr[5]
      );
      delete item._time;
      return item;
    });
  }

  let res = objects;

  changeNameOperation: {

    res = res.map((item, iter, thatArr) => {
      if (item.operation == 'Изменено поле Приоритетная учетная запись') {
        item.operation = 'Приоритетная учетная запись';
      };
      if (item.operation == 'Изменено поле Временно не работал с') {
        item.operation = 'Временно не работал с';
      };
      if (item.operation == 'Изменено поле Временно не работал по') {
        item.operation = 'Временно не работал по';
      };
      if (item.operation == 'Изменился статус') {
        item.operation = 'Статут(Активен/Уволен)';
      };
      if (item.operation == 'Изменился рабочий статус') {
        item.operation = 'Рабочий статус';
      };
      if (item.operation == 'Изменено поле Дата увольнения') {
        item.operation = 'Дата увольнения';
      };
      if (item.operation == 'Изменено поле Дата выхода на работу') {
        item.operation = 'Дата выхода на работу';
      };
      if (item.operation == 'Изменилась дата начала работы') {
        item.operation = 'Дата начала работы';
      };
      if (item.operation == 'Изменилась дата увольнения') {
        item.operation = 'Дата увольнения';
      };
      if (item.operation == 'Изменилась должность') {
        item.operation = 'Тип должности';
      };
      return item;
    });
  }

  changeFormatTime: {
    res = res
      .map((item, iter, thatArr) => {
        transform: {
          if (
            item.operation == "Дата выхода на работу"
            || item.operation == "Дата начала работы"
            || item.operation == "Дата увольнения"
            || item.operation == "Временно не работал по"
            || item.operation == "Временно не работал с"
          ) {
            prepareDate: {
              item._new = `${item.new}`.split(/\D/);
              if (item._new[0].length === 4 && item._new.length === 3) {
                item._new = item._new.reverse();
              }
              if (item._new[0].length === 4 && item._new.length === 6) {
                item._new = item._new.slice(0, 3);
                item._new = item._new.reverse();
              }
              if (item._new[2] === '0000') {
                item.new = null;
              }
            }
            makeDate: {
              let tzofs = new Date(
                item._new[2], item._new[1] - 1, item._new[0], 0, 0, 0, 0
              ).getTimezoneOffset();
              item.new = new Date(
                item._new[2], item._new[1] - 1, item._new[0], 0, 0 - tzofs, 0, 0
              );
              delete item._new;
            }
          }
        }
        return item;
      })
      .map((item, iter, thatArr) => {
        transform: {
          if (
            item.operation == "Дата выхода на работу"
            || item.operation == "Дата начала работы"
            || item.operation == "Дата увольнения"
            || item.operation == "Временно не работал по"
            || item.operation == "Временно не работал с"
          ) {
            prepareDate: {
              item._old = `${item.old}`.split(/\D/);
              if (item._old[0].length === 4 && item._old.length === 3) {
                item._old = item._old.reverse();
              }
              if (item._old[0].length === 4 && item._old.length === 6) {
                item._old = item._old.slice(0, 3);
                item._old = item._old.reverse();
              }
              if (item._old[2] === '0000') {
                item.old = null;
              }
            }
            makeDate: {
              let tzofs = new Date(
                item._old[2], item._old[1] - 1, item._old[0], 0, 0, 0, 0
              ).getTimezoneOffset();
              item.old = new Date(
                item._old[2], item._old[1] - 1, item._old[0], 0, 0 - tzofs, 0, 0
              );
              delete item._old;
            }
          }
        }
        return item;
      });
  }

  typeOfPost: {

    let postType = (id) => {
      let type = positions.filter(
        (item, iter, thatArr) => {
          return item.id == id;
        }
      );
      if (type[0] == undefined) {
        return id;
      }
      let typeName = positions_types.filter(
        (item, iter, thatArr) => {
          return item.id = type[0].position_type_id;
        }
      );
      if (typeName[0] == undefined) {
        return id;
      }
      return typeName[0].name;
    };

    res.map(
      (item, iter, thatArr) => {
        if (item.operation == 'Тип должности') {
          item.new = postType(item.new);
          item.old = postType(item.old);
        }
        return item;
      }
    );
  }

  sortResult: {
    res.sort((a, b) => {
      return a.time.getTime() - b.time.getTime();
    });
  }

  JSON: {

    // let idArr = [...new Set(res.map(item => {
    //   return item.client;
    // }))];


    // let result = {};

    // idArr/* .slice(0, 100) */.map((item, i) => {
    //   console.log(i + " из " + idArr.length);
    //   result[`${item}`] = res.filter(item_ => {
    //     return item_.client === item;
    //   });
    // });

    // fs.writeFileSync("./result.json", JSON.stringify(result/* .slice(10000, 10200) */));
  }


  // [
  //   'Тип должности', 
  //   'Статут(Активен/Уволен)',
  //   'Дата начала работы',
  //   'Рабочий статус',
  //   'Дата увольнения',
  //   'Дата выхода на работу',
  //   'Временно не работал по',
  //   'Временно не работал с',
  //   'Приоритетная учетная запись'
  // ]

  console.log(
    new Set([...new Set(res.map(item => {
      if (item.operation === 'Рабочий статус') {
        return item.old;
      };
    })),
    ...new Set(res.map(item => {
      if (item.operation === 'Рабочий статус') {
        return item.new;
      };
    }))])
  );

  console.log(
    new Set([...new Set(res.map(item => {
      if (item.operation === 'Статут(Активен/Уволен)') {
        return item.old;
      };
    })),
    ...new Set(res.map(item => {
      if (item.operation === 'Статут(Активен/Уволен)') {
        return item.new;
      };
    }))])
  );

  // console.log(
  //   [...new Set(res.map(item => {
  //     if (item.operation === 'Статут(Активен/Уволен)') {
  //       return item.old;
  //     };
  //   }))]
  // );
}


