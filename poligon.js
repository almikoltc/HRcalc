import { google } from "googleapis";

import keys from "./components/keys.json" assert { type: 'json' };

/* авторизация */

let client;

client: {
  client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  client.authorize((err, tokens) => {
    if (err) {
      console.log("Err!");
    } else {
      console.log("Connect");
    }
  });
}

/* получение списка листов со страницы */

async function getSheetNames(id, auth, api) {

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

  console.log(rawData);
}

getSheetNames("1G3WL-5uOUFZdxvRNFkh0N9kyG5rwIpRlFVTwKMVT1O4", client, google);