export default async function objectsPlus(arr, obj) {
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
      "Месяц найма",
    ]);
  }
  body: {
    arr.body = arr.body.map((item, i) => {
      return addProp(item, i);
    });
    function addProp(item, i) {
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
      item["Месяц найма"] = monthGroup(item['Дата выхода на работу']);
      return item;
    }
  }
  return arr;
};
/*
 */
const day = 864 * 10 ** 5;
function monthGroup(date) { // группа найма
  if (!date || date === 'null') { return "Ошибка: нет даты выхода на работу!"; }
  return new Date(date.getFullYear(), date.getMonth(), 1).toDateString();
}
const hiredFail = (leave, workDays) => { // ошибка найма?
  return (leave === true && workDays <= 14);
};
function beActive(start, end, obj) { // был активен (в том месяце)?
  if (start === '' || start === null || start >= obj.periodEnd) { return "Ошибка"; }
  if (end === null) { return true; }
  return end >= obj.periodEnd;
}
function beHired(start, end, obj) { // был нанят (в том месяце)?
  if (start === null) { return 'Ошибка'; }
  return start >= obj.periodStart && start < obj.periodEnd;
}
function beFired(start, end, obj) { // был уволен (в том месяце)?
  if (end === '') { return 'Ошибка'; }
  if (end === null) { return false; }
  return end >= obj.periodStart && end < obj.periodEnd;
}
function dateDiffM(start, end, monthEnd) {
  if (!start || start === 'null') { return "Ошибка: нет даты выхода на работу!"; }
  if (!end || end === 'null') { end = new Date(); }
  if (end.getTime() > monthEnd.getTime()) { end = monthEnd; }
  return (
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1
  );
}
function dateDiffD(start, end, monthEnd) {
  if (!start || start === 'null') { return "Ошибка: нет даты выхода на работу!"; }
  if (!end || end === 'null') { end = new Date(); }
  if (end.getTime() > monthEnd.getTime()) { end = monthEnd; }
  return (
    parseInt((end.getTime() - start.getTime()) / day)
  );
}
