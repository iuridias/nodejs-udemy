const fs = require('fs');

if(!fs.existsSync('./minhapasta')) {
  console.log('Não existe o diretório, será criado.')
  fs.mkdirSync('minhapasta');
} 


if(fs.existsSync('./minhapasta')) {
  console.log('Diretório existe.')
} 