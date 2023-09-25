export default function (table, head_ = null) {
  /* принимает массив,  возвращает массив с объектами,
  где оглавление - ключи, а строки формируют значения ключей */

  let head = head_ == null ? table.shift() : head_;

  return {
    head: head,
    body: table
      .map(item => {
        try {
          return item
            .reduce((acc, item, i) => {
              acc[head[i]] = item;
              return acc;
            }, {});
        } catch { }
      })
  };
}