/*
Aвторизация
*/
import keys from "./keys.json" assert { type: 'json' };
import { google } from "googleapis";
/*
*/
export default function () {
  let client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);
  client.authorize((err, tokens) => {
    if (err) {
      console.log("Authorization err");
    } else {
      console.log("Authorization OK");
    }
  });
  return client;
}