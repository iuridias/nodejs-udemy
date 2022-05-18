const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql2');

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

  const sqlQuery = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`

  conn.query(sqlQuery, error => {
    if (error) {
      console.log(error);
    }

    res.redirect('/books');
  })
})

app.get('/books', (req, res) => {
  const sqlQuery = `SELECT * FROM books`;

  conn.query(sqlQuery, (error, data) => {
    if (error) {
      return console.log(error)
    }
    const books = data;

    res.render('books', { books });
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sqlQuery, (error, data) => {
    if (error) {
      return console.log(error)
    };

    const book = data[0];

    res.render('book', { book });
  })
})

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id;

  const sqlQuery = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sqlQuery, (error, data) => {
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

  const sqlQuery = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`;

  conn.query(sqlQuery, (error, data) => {
    if (error) {
      return console.log(error)
    }

    res.redirect('/books');
  })
});

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const sqlQuery = `DELETE FROM books WHERE id = ${id}`;

  conn.query(sqlQuery, (error, data) => {
    if (error) {
      return console.log(error);
    }

    res.redirect('/books');
  })
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'nodemysql'
});

conn.connect(error => {
  if (error) {
    console.log(error);
  }
  console.log('Conectado com sucesso ao mysql.')

  app.listen(PORT, () => {
    console.log(`executando aplicação na porta ${PORT}`);
  });
});