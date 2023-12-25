export default function (obj) {
  const offset = new Date().getTimezoneOffset() / 60;
  /*
  */
  let res = {
    inputDate: new Date(obj.year, obj.month - 1, 1, -offset, 0, 0, 0),
    periodStart: new Date(obj.year, obj.month - 1, 1, -offset, 0, 0, 0),
    periodEnd: new Date(obj.year, obj.month, 1, -offset, 0, 0, 0),
    monthEnd: new Date(obj.year, obj.month, 0, -offset, 0, 0, 0),
    sheetID: obj.id,
    sheetRange: obj.range
    // col: 0
  };
  /*
  */
  return res;
}