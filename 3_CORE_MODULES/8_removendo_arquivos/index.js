const fs = require('fs');

fs.unlink('arquivo.txt', erro => {
  if(erro) {
    console.log(erro);
  } else {
    console.log('Arquivo removido.')
  }
})