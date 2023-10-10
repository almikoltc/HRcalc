import _progress from 'cli-progress';

export default function calculation(arrQuery, arrObjects) {

  let groupedArr = {};

  groupedArr: {
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
  }

  const pb = new _progress.Bar({
    barCompleteChar: '█',
    barIncompleteChar: '-',
    format: 'Расчёт значений: {bar} {percentage}%',
    fps: 15,
    // stream: process.stdout,
    barsize: 30
  });

  pb.start(arrQuery.length, 0);

  return arrQuery.map((elQ, i) => {

    pb.update(i + i);

    arrQuery.length === i + 1 ? pb.stop() : (1 + 1);

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