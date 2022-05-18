const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const PORT = 3000;

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
})

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title;
  const pageqty = Number(req.body.pageqty);

  const sqlQuery = `INSERT INTO books (??, ??) VALUES (?, ?)`
  const data = ['title', 'pageqty', title, pageqty];

  pool.query(sqlQuery, data, (error) => {
    if (error) {
      console.log(error);
    }

    res.redirect('/books');
  })
})

app.get('/books', (req, res) => {
  const sqlQuery = `SELECT * FROM books`;

  pool.query(sqlQuery, (error, data) => {
    if (error) {
      return console.log(error)
    }
    const books = data;

    res.render('books', { books });
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM books WHERE ?? = ?`;

  const data = ['id', id];

  pool.query(sqlQuery, data, (error, data) => {
    if (error) {
      return console.log(error)
    };

    const book = data[0];

    res.render('book', { book });
  })
})

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;

  const sqlQuery = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sqlQuery, data, (error, data) => {
    if (error) {
      return console.log(error);
    }

    const book = data[0];

    res.render('editbook', { book });
  })

})

app.post('/books/updatebook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sqlQuery = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(sqlQuery, data, (error, data) => {
    if (error) {
      return console.log(error)
    }

    res.redirect('/books');
  })
});

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const sqlQuery = `DELETE FROM books WHERE ?? = ?`;
  const data = ['id', id]

  pool.query(sqlQuery, data, (error, data) => {
    if (error) {
      return console.log(error);
    }

    res.redirect('/books');
  })
})

app.listen(PORT, () => console.log(`Executando na porta ${PORT}`));