import { google } from "googleapis";


export default async function (client, range) {


  const opt = {
    spreadsheetId: ["1G3WL-5uOUFZdxvRNFkh0N9kyG5rwIpRlFVTwKMVT1O4"],
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

  return rawData;
}