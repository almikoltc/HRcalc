export default function (obj) {
  const offset = new Date().getTimezoneOffset() * 60000;
  obj.body = obj.body.map(el => {
    for (let key in el) {
      if (el[key] === 'null' || el[key] === '') {
        el[key] = null;
      }
      if (['Дата выхода на работу',
        'Дата увольнения',
        'Временно не работал с',
        'Временно не работал по',
        'Временно не работал с (предыдущая)',
        'Временно не работал по (предыдущая)']
        .includes(key)) {
        if (!el[key]) {
          continue;
        }
        el[key] = new Date(Date.parse(el[key]) - offset);
      }
    }
    return el;
  });
  return obj;
};