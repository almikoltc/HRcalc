export default function (arr) {
   return arr.map((el, i) => {
      return Object.assign(el, newOptions[el['Показатель']]);
   });
}

let newOptions = { /* если null - фильт пропускает значение */
   'Численность, всего': {
      'Статус': null,
      'Группа 0 (Да/Нет)': null,
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность в гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Да',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено в гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Да',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность, всего без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 1 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 1,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 2 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 2,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 3 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 3,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 4 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 4,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 5 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 5,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 6 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 6,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 7 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 7,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 8 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 8,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 9 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 9,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 10 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 10,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 11 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 11,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 12 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 12,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 13 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 13,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 14 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 14,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 15 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 15,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 16 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 16,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 17 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 17,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 18 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 18,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 19 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 19,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 20 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 20,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 21 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 21,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 22 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 22,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 23 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 23,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 24 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 24,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 7-12 мес, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': true,
      'Стаж 12+': null
   },
   'Численность - 6 мес +, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': true,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Численность - 12 мес +, без гр.0': {
      'Статус': 'Активен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': true,
      'Был принят': null,
      'Был уволен': null,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': true
   },
   'Уволено - 1-2 нед, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': true,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено, всего, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 1 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 1,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 2 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 2,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 3 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 3,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 4 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 4,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 5 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 5,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 6 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': 6,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 7-12 мес, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': true,
      'Стаж 12+': null
   },
   'Уволено - 6 мес +, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': true,
      'Стаж 7-12': null,
      'Стаж 12+': null
   },
   'Уволено - 12 мес +, без гр.0': {
      'Статус': 'Уволен',
      'Группа 0 (Да/Нет)': 'Нет',
      'Статус приоритет': 'Да',
      'Код сотрудника': null,
      'ФИО сотрудника': null,
      'Дата выхода на работу': null,
      'Дата увольнения': null,
      'Стаж работы в месяцах': null,
      'Стаж работы в днях': null,
      'Был активен': null,
      'Был принят': null,
      'Был уволен': true,
      'Ошибка найма': null,
      'Стаж 6+': null,
      'Стаж 7-12': null,
      'Стаж 12+': true
   },
   'Текучесть (общая) - всего, % без гр.0': {
      value: 0
   },
   'Текучесть (общая) - 7-12 мес, % без гр.0': {
      value: 0
   },
   'Текучесть (общая) - 6 мес +, % без гр.0': {
      value: 0
   },
   'Текучесть (общая) - 12 мес +, %, без гр.0': {
      value: 0
   }
};
