const express = require('express');
const path = require('path');

const users = require('./users');
const app = express();
const port = 3000; //variável de 

const basePath = path.join(__dirname, 'templates');
const checkAuth = function(req, res, next) {
  req.authStatus = true;

  if (req.authStatus) {
    console.log('Está logado.');
    next();
  } else {
    console.log('Não está logado, faça o login,')
  }
}


app.use(checkAuth);
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use('/users', users)

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
});

app.use((req, res, next) => {
  res.status(404).sendFile(`${basePath}/404.html`);
})

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});