const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const port = 3000;

const hbs = exphbs.create({
  partialsDir: ['views/partials']
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  const user = {
    name: 'Iuri',
    surname: 'Dias'
  }

  const auth = true;

  res.render('home', {user: user, auth}) //se tem o mesmo nome em js, poderia usar apenas user uma vez.
});

app.get('/dashboard', (req, res) => {
  const itens = ['Item A', 'Item B', 'Item C'];

  res.render('dashboard', {itens});
})

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender NodeJs',
    category: 'Javascript',
    body: 'Este artigo vai te ensinar a aprender node.',
    comments: 4
  }

  res.render('blogpost', {post});
})

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprender NodeJs',
      category: 'javascript',
      body: 'Teste',
      comments: 4
    },
    {
      title: 'Aprender PHP',
      category: 'php',
      body: 'Teste',
      comments: 2
    },
    {
      title: 'Aprender React',
      category: 'javascript',
      body: 'Teste',
      comments: 5
    },
  ];

  res.render('blog', {posts});
})

app.listen(port, ()=> {
  console.log(`Executando na porta ${port}.`);
})