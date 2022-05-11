const chalk = require('chalk');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'nome',
    message: 'Digite seu nome:'
  },
  {
    name: 'idade',
    message: 'Digite sua idade:'
  }
]).then(
  resposta => {
    if(!resposta.nome || !resposta.idade) {
      throw new Error(`Você deve digitar nome e idade.`)
    }

    const saida = `Seu nome é ${resposta.nome} e você tem ${resposta.idade} anos.`

    console.log(chalk.bgYellow.black.bold(saida));
  }
).catch(
  erro => console.log(`Erro: ${erro}`)
);