export default function (obj) {
  /* принимает объек с массивом заголовков 
  и массивом объектов для строк,
  возвращает таблиу */

  return {
    head: obj.head,
    body: obj.body.map((item, ind) => {
      return obj.head.map((item_, ind) => {
        return item[item_];
      });
    })
  };
};