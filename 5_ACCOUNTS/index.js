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
      deposit();
    } else if (action === 'Sacar') {
      drawBalance()
    } else if (action === 'Consultar saldo') {
      getAccountBalance();
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

//function for deposit
function deposit() {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Qual o nome da sua conta?'
  }])
    .then( answer => {
      const accountName = answer['accountName'];
      if(!checkAccount(accountName)) {
        return deposit();
      }
      inquirer.prompt([{
        name: 'amount',
        message: 'Quanto você deseja depositar?'
      }])
        .then(answer => {
          const amount = answer['amount'];
          addAmount(accountName, amount);
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

}


//check if account exists
function checkAccount(accountName) {
  if(!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black('Essa conta não existe! Tente novamente'));
    return false;
  }
  return true;
}

//add amount
function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (amount <= 0 || !amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente.'));
    return deposit();
  }

  accountData.balance += parseFloat(amount);

  fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    error => console.log(error));

  console.log(chalk.bgGreen.black(`R$${amount} adicionado com sucesso a sua conta!`))
  console.log(chalk.bgGreen.black(`Saldo Atualizado: R$${accountData.balance}`))
  return operation();
}

//transform JSON to Object
function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf-8',
    flag: 'r'
  });
  return JSON.parse(accountJSON);
}

//verify balance
function getAccountBalance() {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Qual o nome da sua conta?'
  }])
    .then(answer => {
      const accountName = answer['accountName'];

      if(!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(chalk.bgBlue.black.bold(`O saldo da conta é R$${accountData.balance}`));
      return operation();

    })
    .catch(error => console.log(error));
}

function drawBalance() {
  inquirer.prompt([{
    name: 'accountName',
    message: 'Qual o nome da sua conta?'
  }])
    .then(answer => {
      const accountName = answer['accountName'];
      if (!checkAccount(accountName)) {
        return drawBalance();
      }
      inquirer.prompt([{
        name: 'amount',
        message: 'Quanto você deseja sacar?'
      }])
        .then(answer => {
          const amount = answer['amount'];
          removeAmount(accountName, amount);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  let accountBalance = accountData.balance;

  if(amount > accountBalance || !amount) {
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente.'));
    return drawBalance();
  }
  
  accountData.balance -= parseFloat(amount);

  fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    error => console.log(error));

  console.log(chalk.bgBlue.black(`R$${amount} sacado com sucesso!`))
  console.log(chalk.bgBlue.black(`Saldo Atualizado: R$${accountData.balance}`))
  return operation();
}