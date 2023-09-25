import { google } from "googleapis";

import key from "./key.json" assert { type: 'json' };

const client = new google.auth.JWT(key.client_email, null, key.private_key, [
  "https://www.googleapis.com/auth/spreadsheets",
]);

login: {

  client.authorize((err, tokens) => {
    if (err) {
      console.log("Err!");
      return;
    } else {
      console.log("Connect");
    }
  });

}