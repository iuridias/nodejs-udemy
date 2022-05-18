const express = require('express');

const router = express.Router();

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`<h1>Página do livro de id ${id}</h1>`);
})

router.get('/', (req, res) => {
  res.send(`<h1>Digite um id para teste.</h1>`)
})

module.exports = router;