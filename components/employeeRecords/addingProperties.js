export default async function objectsPlus(arr, obj) {

  /* TODO Автоматически добавлять наименования расчетных значений в .head */
  /* TODO Рассчитать дополнительные значения из json 'Статсу приоритет' и 'Группа 0' */

  // let fs = require('fs');
  // let logs = require('../../result.json');
  // .filter(item => {
  //     return item.operation == 'Статут(Активен/Уволен)';
  // });

  let
    length = arr.body.length,
    progres = 0.00,
    progresIOld = 0,
    progresINew = 0;

  head: {
    arr.head = arr.head.concat([
      'Период расчета',
      'Стаж работы в месяцах',
      'Стаж работы в днях',
      'Был активен',
      'Был принят',
      "Был уволен",
      "Ошибка найма",
      "Стаж 6+",
      "Стаж 7-12",
      "Стаж 12+",
      // "Статут(Активен/Уволен)(лог)",
      // "Рабочий статус(лог)",
      // "Временно не работал с(лог)",
      // "Временно не работал по(лог)",
      // "Приоритетная учетная запись(лог)",
      // "Тип должности(лог)",
      // "Дата выхода на работу(лог)",
      // "Дата увольнения(лог)"
    ]);
  }

  body: {

    arr.body = arr.body/* .slice(0, 1000) */.map((item, i) => {
      return addProp(item, i);
    });

    function addProp(item, i) {
      progres: {
        if (((i + 1) / length).toFixed(2) > progres) {
          progres = ((i + 1) / length).toFixed(2);
          progresIOld = progresINew + 1;
          progresINew = i + 1;
          console.log(
            (progres * 100).toFixed(0)
            + '% --> +'
            + (progresINew - progresIOld)
            + ' (' + i + ') addingProperties'
          );
        }
      }



      item['Период расчета'] = obj.periodStart;
      item['Стаж работы в месяцах'] = dateDiffM(item['Дата выхода на работу'], item['Дата увольнения'], obj.monthEnd);
      item['Стаж работы в днях'] = dateDiffD(item['Дата выхода на работу'], item['Дата увольнения'], obj.monthEnd);
      item['Был активен'] = beActive(item['Дата выхода на работу'], item["Дата увольнения"], obj);
      item['Был принят'] = beHired(item['Дата выхода на работу'], item["Дата увольнения"], obj);
      item["Был уволен"] = beFired(item['Дата выхода на работу'], item["Дата увольнения"], obj);
      item["Ошибка найма"] = hiredFail(item["Был уволен"], item['Стаж работы в днях']);
      item["Стаж 6+"] = item['Стаж работы в месяцах'] > 6;
      item["Стаж 7-12"] = (item['Стаж работы в месяцах'] > 6 && item['Стаж работы в месяцах'] < 13);
      item["Стаж 12+"] = item['Стаж работы в месяцах'] > 12;

      // let
      //     logsLocal;
      // loginfo: {
      //     logsLocal = logs.filter(
      //         (itemLogs, iter, thatArr) => {
      //             return itemLogs.client == item["Код сотрудника"]
      //         }
      //     )
      // }

      // item["Статут(Активен/Уволен)(лог)"] = status(logsLocal, obj, item["Код сотрудника"]);
      // item["Рабочий статус(лог)"] = workStatus(logsLocal, obj, item["Код сотрудника"]);
      // item["Временно не работал с(лог)"] = workPauseFrom(logsLocal, obj, item["Код сотрудника"]);
      // item["Временно не работал по(лог)"] = workPauseTo(logsLocal, obj, item["Код сотрудника"]);
      // item["Приоритетная учетная запись(лог)"] = priorityAccount(logsLocal, obj, item["Код сотрудника"]);
      // item["Тип должности(лог)"] = postType(logsLocal, obj, item["Код сотрудника"]);
      // item["Дата выхода на работу(лог)"] = employmentDate(logsLocal, obj, item["Код сотрудника"]);
      // item["Дата увольнения(лог)"] = leaveDate(logsLocal, obj, item["Код сотрудника"]);

      return item;

    }
  }

  return arr;

};

function status(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Статут(Активен/Уволен)';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    return res[0].new;
  }

  return null;
}

function workStatus(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Рабочий статус';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function workPauseFrom(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Временно не работал с';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function workPauseTo(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Временно не работал по';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function priorityAccount(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Приоритетная учетная запись';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function postType(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Тип должности';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function employmentDate(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Дата выхода на работу';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function leaveDate(logs, obj, id) {

  let res = logs
    .filter(
      (item, iter, thatArr) => {
        return item.operation == 'Дата увольнения';
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return item.client == id;
      }
    )
    .filter(
      (item, iter, thatArr) => {
        return new Date(item.time).getTime() < new Date(obj.periodEnd).getTime();
      }
    )
    .slice(-1);

  if (res.length > 0) {
    // console.log(res[0].new)
    return res[0].new;
  }

  return null;
}

function hiredFail(leave, workDays) {
  return (leave === true && workDays <= 14);
}

function beActive(start, end, obj) {
  if (start === '' || start === null) {
    return "Ошибка";
  }

  if (end === null) {
    return true;
  }

  return end >= obj.periodEnd;
}

function beHired(start, end, obj) {
  if (start === null) {
    return 'Ошибка';
  }
  return start >= obj.periodStart && start < obj.periodEnd;
}

function beFired(start, end, obj) {
  if (end === '') {
    return 'Ошибка';
  }
  if (end === null) {
    return false;
  }
  return end >= obj.periodStart && end < obj.periodEnd;
}

function dateDiffM(start, end, monthEnd) {
  if (!start || start === 'null') {
    return "Ошибка: нет даты выхода на работу!";
  }
  if (!end || end === 'null') {
    end = new Date();
  }
  if (end.getTime() > monthEnd.getTime()) {
    end = monthEnd;
  }
  return (
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) + 1
  );
}

function dateDiffD(start, end, monthEnd) {
  if (!start || start === 'null') {
    return "Ошибка: нет даты выхода на работу!";
  }
  if (!end || end === 'null') {
    end = new Date();
  }
  if (end.getTime() > monthEnd.getTime()) {
    end = monthEnd;
  }
  /* TODO нормальная корректировка часового пояса ниже - готово*/
  return (
    parseInt((end.getTime() - start.getTime()) / (864 * 10 ** 5))
  );
}
