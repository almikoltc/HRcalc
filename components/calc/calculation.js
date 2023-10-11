import _progress from 'cli-progress';

export default function calculation(arrQuery, arrObjects) {

  let groupedArr = {};

  groupedArr: {
    arrObjects.map(item => {

      item["Дополнительный рабочий адрес"] === "null" ? item["Дополнительный рабочий адрес"] = null : item;

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
    barIncompleteChar: '|',
    format: 'Расчёт значений: {bar} {percentage}%',
    fps: 5,
    stream: process.stdout,
    barsize: 30
  });

  pb.start(arrQuery.length, 0);

  return arrQuery.map((elQ, i) => {

    pb.update(i + i);

    arrQuery.length === i + 1 ? pb.stop() : true;

    calc: {

      let result = groupedArr[elQ["Город"]][elQ["Тип должности"]];

      if (result === undefined) {
        return {
          city: elQ["Город"],
          addres: elQ["Дополнительный рабочий адрес"],
          post: elQ["Тип должности"],
          indicator: elQ["Показатель"],
          value: 0,
        };
      }

      for (let key in elQ) {
        result = filter(key, elQ[key], result);
      }

      let res = result.length;

      return {
        city: elQ["Город"],
        addres: elQ["Дополнительный рабочий адрес"],
        post: elQ["Тип должности"],
        indicator: elQ["Показатель"],
        value: res,
      };
      // return [res];
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