import { google } from "googleapis";


/* получение списка листов со страницы */

export default async function getSheetNames(client, id) {

  const gsapi = google.sheets({
    version: "v4",
    auth: client,
  });

  let answer = await gsapi.spreadsheets.get({
    spreadsheetId: id,
  });

  let rawData = answer.data.sheets.map(item => {
    return item.properties.title;
  });

  return rawData;
}
