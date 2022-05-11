const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Qual seu time? ', time => {
  console.log(`Meu time é ${time}`);
  readline.close();
});
