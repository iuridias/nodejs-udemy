const os = require('os');

const cpu = os.cpus();
const memoriaLivre = os.freemem();
const diretorioHome = os.homedir();
const tipoDeSistema = os.type();

console.log(cpu);
console.log(memoriaLivre);
console.log(diretorioHome);
console.log(tipoDeSistema);