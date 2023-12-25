import { google } from "googleapis";
export default async function (cl, value, sheet) {
  const gsapi = google.sheets({
    version: "v4",
    auth: cl,
  });
  let opt = {
    spreadsheetId: ["1lO0WRidetafz33g6VqaXiZB22bpgxr2wfNJVlh1H5wY"],
    range: `${sheet}!A1`,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: value
    }
  };
  await gsapi.spreadsheets.values.clear({
    spreadsheetId: "1lO0WRidetafz33g6VqaXiZB22bpgxr2wfNJVlh1H5wY",
    range: `${sheet}!A1`
  });
  await gsapi.spreadsheets.values.update(opt);
  console.log('exportDisplay - ok');
  // let rawData = answer.data.values;
  // return rawData;
};