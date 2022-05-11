const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'pergunta1',
    message: 'Qual a primeira nota?'
  },
  {
    name: 'pergunta2',
    message: 'Qual a segunda nota?'
  }
]).then(
  respostas => {
    console.log(respostas)
    const media = (parseInt(respostas.pergunta1) + parseInt(respostas.pergunta2)) / 2;
    console.log(`A média é ${media}`);
  }
).catch(
    erro => console.log(erro)
);