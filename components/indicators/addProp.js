export default function (arr) {
  return arr.map((el, i) => {
    return Object.assign(el, newOptions[el['Показатель']]);
  });
}

let newOptions = { /* если null - фильт пропускает значение */
  'Численность, всего': {
    'Статус': 'Активен',
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
    'Стаж 12+': null,
    // 'Месяц найма': null,
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
    'Стаж 12+': null,
    // 'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    // 'Месяц найма': null,
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
    'Стаж 12+': null,
    // 'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Стаж 12+': true,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': true,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    // 'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': true,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': true,
    'Стаж 7-12': null,
    'Стаж 12+': null,
    'Месяц найма': null,
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
    'Был активен': true,
    'Был принят': null,
    'Был уволен': true,
    'Ошибка найма': null,
    'Стаж 6+': null,
    'Стаж 7-12': null,
    'Стаж 12+': true,
    'Месяц найма': null,
  }
};
