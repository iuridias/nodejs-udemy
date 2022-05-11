const path = require('path');

const caminhoAbsoluto = path.resolve('arquivo.txt');
console.log(caminhoAbsoluto);

//formar path
const midFolder = 'relatorios';
const fileName = 'iuri.txt';

const finalPath = path.join('/', 'arquivos', midFolder, fileName);

console.log(finalPath);