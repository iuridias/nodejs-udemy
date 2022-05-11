const fs = require('fs');

console.log('Inicio');

fs.writeFile('arquivo2.txt', 'oi', (erro) => {
  setTimeout(function() {
    console.log('Arquivo criado.');
  }, 1000);
})

console.log('Fim');