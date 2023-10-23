import express from 'express';
import http from 'http';
import open from 'open';
export default async function htmlResult(arr)
{
  const app = express();
  const httpServer = http.createServer(app);
  httpServer.listen('3000');
  const port = 3000;
  app.get('/', (req, res) =>
  {
    let tableContent = arr.map(item =>
    {
      let res = Object.values(item).map(item =>
      {
        return `<td>${item}</td>`;
      }).join("");

      return `<tr>${res}</tr>`;
    }).join("");

    res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=80wh, initial-scale=1.0">
      <title>HRcalc</title>
    </head>
    <body>
      <table cellspacing="2" border="1" cellpadding="5" width="900">
        <tbody>
          ${tableContent /* = null *//*  = "<h2> e12312312</h2>" */}
        </tbody >
      </table >
    </body >

    </html > `);
  });


  let server = app.listen(port, 'localhost', () =>
  {
    open('http://localhost:3000');
  });
};;
