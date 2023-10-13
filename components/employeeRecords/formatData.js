export default function (obj) {
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
            el[key] = new Date(
               new Date(el[key]).getTime() + 300 * 60000
            );
         }
      }
      return el;
   });
   return obj;
};