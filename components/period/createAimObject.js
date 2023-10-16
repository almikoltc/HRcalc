export default async function (obj) {

   /* TODO Убрать ручную корректировку часового пояса */

   let res = {
      inputDate: new Date(obj.year, obj.month - 1, 1, 5, 0, 0, 0),
      periodStart: new Date(obj.year, obj.month - 1, 1, 5, 0, 0, 0),
      periodEnd: new Date(obj.year, obj.month, 1, 5, 0, 0, 0),
      monthEnd: new Date(obj.year, obj.month, 0, 5, 0, 0, 0),
      col: 0
   };

   obj.data.flat().forEach((el, i) => {
      let splitArr = el.split('.');
      let serchDate = new Date(splitArr[2], splitArr[1] - 1, splitArr[0], 5, 0, 0, 0);
      if (serchDate.getTime() == res.inputDate.getTime()) {
         res.col = i + 1;
      }
      // return qq;
   });

   //   console.log(res)

   return res;
}