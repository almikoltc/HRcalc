import http from "http";
/*
 */
const token = 'SmIPyU8QKb';
const request_body = {
  hostname: 'http://dc0-prod-bi-external-01.esoft.local',
  port: 10022,
  path: '/report/api/v1/requestRawReportData',
  token: token,
  report_id: 2226,
  fields: ["ticket_id", "ticket_created", "rieltor_id", "rieltor_fio"],
  filter_query: [
    {
      "field": "custom_field_1682494207472",
      "values": [27, 17],
      "operation": "exclude"
    },
    {
      "field": "date_ispitat",
      "values": ["2015-11-20T00:00:00Z TO NOW"],
      "type": "date",
      "operation": "exclude"
    }
  ],
  rows: 10000,
  start: 0
};
/*
 */
http.request(request_body, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
});
