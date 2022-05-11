const path = require('path');

const customPath ='/relatorios/iuri/relatorio1.pdf';

const diretorio = path.dirname(customPath);
const nomeArquivo = path.basename(customPath);
const extensao = path.extname(customPath);

console.log(diretorio);
console.log(nomeArquivo);
console.log(extensao);