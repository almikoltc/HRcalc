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


  return arrQuery.map((elQ, i) => {

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