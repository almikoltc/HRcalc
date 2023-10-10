export default function calculation(arrQuery, arrObjects) {

  let groupedArr = {};

  arrObjects.map(item => {

    if (groupedArr[item["Город"]] === undefined) {
      groupedArr[item["Город"]] = {};
    }
    if (groupedArr[item["Город"]][item["Тип должности"]] === undefined) {
      groupedArr[item["Город"]][item["Тип должности"]] = [item];
    } else {
      groupedArr[item["Город"]][item["Тип должности"]].push(item);
    }
  });

  // console.log(groupedArr);

  let
    length = arrQuery.length,
    progres = 0.00,
    progresIOld = 0,
    progresINew = 0;


  return arrQuery.map((elQ, i) => {

    progres: {
      if (((i + 1) / length).toFixed(2) > progres) {
        progres = ((i + 1) / length).toFixed(2);
        progresIOld = progresINew + 1;
        progresINew = i + 1;

        console.log(
          (progres * 100).toFixed(0)
          + '% --> +'
          + (progresINew - progresIOld)
          + ' (' + i + ') calculation'
        );
      }
    }

    calc: {

      let result = groupedArr[elQ["Город"]][elQ["Тип должности"]];

      if (result === undefined) {
        return [0];
      }

      for (let key in elQ) {
        result = filter(key, elQ[key], result);
      }
      let res = result.length;
      // elQ.value = res;
      // console.log(elQ);
      return [res];

    }

  });
};

function filter(key, value, arr) {
  if (value === null || value === "" || key === 'Показатель') {
    return arr;
  }
  return arr.filter(el => {
    return el[key] === value;
  });
}