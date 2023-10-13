import { google } from "googleapis";

export default async function (client, range) {

   const opt = {
      spreadsheetId: ["10V1MBl_gMi6oQGeWCY83TWXFcBoIa1Cl4pdpNNiYWyM"], /* Текущий */
      // spreadsheetId: ["1N0pZYTtSE9eWks_u06E5fKEsjEs3oFkI1eBUBiu0Avg"], /* данные конца июля */
      // spreadsheetId: ["1cbcqLgRd4mAy5UuYzbD0050DlBvmhA8y9VhLX6T8Otw"], /* данные конца июня */
      // spreadsheetId: ["1IFaaIORZ3DfBHPtIfZw-gF7xa2IVF8Wvadr4JpQNynU"], /* данные конца мая */
      // spreadsheetId: ["1ERsaA3fZKnPpNvdPWgkC3ArlfcllhjfpItjwbAnGfik"], /* данные конца апреля */
      // spreadsheetId: ["1D9EYjjApCU3yN_BbjE57Y_v0JjaFbAWtnarEj2Y2FRc"], /* данные конца марта */
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