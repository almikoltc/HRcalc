import express from 'express';
import http from 'http';
import open from 'open';
export default async function htmlResult(arr)
{
  const app = express();
  const port = 3000;
  app.get('/', (req, res) =>
  {
    res.send(['Hello World!']);
  });
  let server = app.listen(port, 'localhost', () =>
  {
    open('http://localhost:3000');
  });
}
