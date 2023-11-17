import axios from 'axios';

const token = 'SmIPyU8QKb';
// объект с параметрами
const rawDataObject = {
  token: token,
  report_id: 533,
  rows: 10000,
  start: 0
};

const methods = {
  'rawReportData': 'requestRawReportData',
  'reportData': 'requestReportData',
  'reportRowsCount': 'requestReportRowsCount',
  'templateData': 'requestTemplate'
};

const callMethod = (methodName, dataObject) => {
  axios.post(`http://dc0-prod-bi-external-01.esoft.local:10022/report/api/v1/${methodName}`, dataObject)
    .then((response) => {
      console.log('Ответ:', response.data);
    })
    .catch((error) => {
      console.error('Ошибка:', error);
    });
};

const requestMethod = (methodName, dataObject) => {
  callMethod(methodName, dataObject);
};

// расскомментируй нужный метод

//сырые данные
// requestMethod(methods['rawReportData'], rawDataObject)

//подсчет кол-ва строк
console.log(requestMethod(methods['rawReportData'], rawDataObject));
// requestMethod(methods['reportRowsCount'], rawDataObject);
