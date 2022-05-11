const chalk = require('chalk');

const nota = 7;

if (nota >= 7) {
  console.log(chalk.bgGreen.bold.white(`Parabéns, você foi aprovado!`));
} else {
  console.log(chalk.bgRed.bold(`Você foi reprovado!`))
}