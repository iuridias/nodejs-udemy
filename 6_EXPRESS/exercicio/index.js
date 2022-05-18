const express = require('express');
const path = require('path');

const books = require('./books');

const app = express();
const port = 5000;
const basePath = path.join(__dirname, 'templates');

app.use(
  express.urlencoded({extended: true}),
  express.json()
);

app.use(express.static('./public'));

app.use('/books', books);

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`API executando na porta ${port}`);
})