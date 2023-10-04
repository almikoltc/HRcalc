import { google } from "googleapis";

// import keys from "../keys.json" assert { type: 'json' };

/* авторизация */

// let client;

// client: {
//   client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
//     "https://www.googleapis.com/auth/spreadsheets",
//   ]);

//   client.authorize((err, tokens) => {
//     if (err) {
//       console.log("Err!");
//     } else {
//       console.log("Connect");
//     }
//   });
// }

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

// getSheetNames("10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM", client, google);