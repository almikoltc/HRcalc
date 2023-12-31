import { google } from "googleapis";
/*
*/
export default async function (client, idSheet, range) {
  const opt = {
    spreadsheetId: [idSheet], /*  */
    // spreadsheetId: ["10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM"], /* Текущий */
    range: [range],
    valueRenderOption: "UNFORMATTED_VALUE",
    dateTimeRenderOption: "FORMATTED_STRING"
  };
  const gsapi = google.sheets({
    version: "v4",
    auth: client,
  });
  let answer = await gsapi.spreadsheets.values.get(opt);
  let rawData = answer.data.values;
  console.log(range + " - done");
  return rawData;
}