// fs.writeFileSync('./spn13Data.json', JSON.stringify(res));
// import keys from "./components/keys.json" assert { type: 'json' };

import _progress from 'cli-progress';
import fs from "fs";
const pb = new _progress.Bar({
   barCompleteChar: '█',
   barIncompleteChar: '|',
   format: 'Расчёт значений: {bar} {percentage}% {value}/{total} ({duration} sec.) ',
   fps: 24,
   stream: process.stdout,
   barsize: 20
});
import _03 from "./ignor/март.json" assert { type: 'json' };
import _04 from "./ignor/апрель.json" assert { type: 'json' };
import _05 from "./ignor/май.json" assert { type: 'json' };
import _06 from "./ignor/июнь.json" assert { type: 'json' };
import _07 from "./ignor/июль.json" assert { type: 'json' };
import _08 from "./ignor/август.json" assert { type: 'json' };
import _09 from "./ignor/сентябрь.json" assert { type: 'json' };
let arr = [..._03, ..._04, ..._05, ..._06, ..._07, ..._08, ..._09];
let uniqId = [];
arr.map((item, i) => {
   uniqId[i] = arr[i].id;
});
uniqId = [... new Set(uniqId)];
pb.start(uniqId.length, 0);
console.log(uniqId);
let obj = {};
uniqId/* .slice(0, 100) */.map((item, i) => {
   pb.update(i + 1);
   uniqId.length === i + 1 ? pb.stop() : true;
   // console.log(item);
   obj[`${item}`] = arr.filter(_item => {
      return _item.id == item;
   }).sort((a, b) => { return new Date(a.period).getTime() - new Date(b.period).getTime(); });
});
pb.stop();
fs.writeFileSync('./ОбъединениеСрезов.json', JSON.stringify(obj));
console.log(obj)



