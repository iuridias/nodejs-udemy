const fs = require('fs');

const arquivoAntigo = 'arquivo.txt';
const novoArquivo = 'novoArquivo.txt'

fs.rename(arquivoAntigo, novoArquivo, erro => {
  if(erro){
    console.log(erro);
    return
  } else {
    console.log(`O arquivo ${arquivoAntigo} foi renomeado para ${novoArquivo}.`)
  }
})