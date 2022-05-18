const express = require('express');
const path = require('path');

const router = express.Router();

const basePath = path.join(__dirname, '../templates');

router.post('/save', (req, res) => {
  console.log(req.body);

  const name = req.body.name;
  const age = req.body.age;
  res.sendFile(`${basePath}/userform.html`);

  console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`)
});

router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`<h1>Id ${id}</h1>`);
})

module.exports = router