import { google } from "googleapis";
export default async function (cl, tabid, sheet, value) {
  const gsapi = google.sheets({
    version: "v4",
    auth: cl,
  });
  let opt = {
    spreadsheetId: [tabid],
    range: `${sheet}!A1`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: value
    }
  };
  await gsapi.spreadsheets.values.clear({
    spreadsheetId: tabid,
    range: `${sheet}!A:Z`
  });

  await gsapi.spreadsheets.values.update(opt);

  console.log('exportDisplay - ok');

  // let rawData = answer.data.values;

  // return rawData;
}