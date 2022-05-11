const fs = require('fs');

const caminho = 'arquivo.txt'

fs.stat(caminho, (erro, stats) => {
  if(erro) {
    console.log('Arquivo não existe.')
    return
  } else {
    console.log(stats);
    console.log('----------');
    console.log(stats.isDirectory());
    console.log(stats.isFile());
    console.log(stats.ctime);
    console.log(stats.size);
    console.log(stats.isSymbolicLink());
  }
})