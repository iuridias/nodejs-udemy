//modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

//modulos internos
const fs = require('fs');


operation();

//Operação
function operation() {
  inquirer.prompt([{
    type: 'list',
    name: 'action',
    message: 'O que você deseja fazer?',
    choices: [
      'Criar conta',
      'Consultar saldo',
      'Depositar',
      'Sacar',
      'Sair'
    ],
  }]).then(answer => {
    const action = answer['action'];

    if (action === 'Criar conta') {
      createAccount();
    } else if (action === 'Depositar') {

    } else if (action === 'Sacar') {

    } else if (action === 'Consultar saldo') {

    } else if (action === 'Sair') {
      console.log(chalk.bgBlue.black.bold('Obrigado por usar o Accounts!'));
      process.exit;
    }

  }).catch(erro => console.log(erro))
}

//Criação da conta
function createAccount() {
  console.log(chalk.bgGreen.black.bold('Parabéns por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir:'));
  buildAccount();
}

function buildAccount() {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Digite um nome para sua conta:'
  }]).then(answer => {
    accountName = answer.accountName;

    console.log(accountName);

    if (!fs.existsSync('accounts')) {
      fs.mkdirSync('accounts')
    }

    if (fs.existsSync(`accounts/${accountName}.json`)) {
      console.log(chalk.bgRed.black.bold('Conta já existe, escolha outro nome:'));
      return buildAccount();
    } else {
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{ "balance": 0 }',
        erro => console.log(erro));
    }
    
    console.log(chalk.green('Parabéns, sua conta foi criada!'));
    operation();

  }).catch(erro => console.log(erro))
}