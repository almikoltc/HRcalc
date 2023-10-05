export default async function objectsPlus(arr, obj) {

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
      "Группа месяца",
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
      item["Группа месяца"] = monthGroup(item['Дата выхода на работу']);

      return item;

    }
  }

  return arr;

};

function monthGroup(date) {
  if (!date || date === 'null') {
    return "Ошибка: нет даты выхода на работу!";
  }
  return new Date(date.getFullYear(), date.getMonth(), 1, 5, 0, 0, 0);
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
