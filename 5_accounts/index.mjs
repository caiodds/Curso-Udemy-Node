//modulos externos

import inquirer from "inquirer";
import chalk from "chalk";

//modulos internos
import fs from "fs";

console.log("Iniciamos o Accounts");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que deseja fazer?",
        choices: [
          "Criar conta",
          "Consultar Saldo",
          "Depositar",
          "Sacar",
          "PIX",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      switch (action) {
        case "Criar conta":
          criacaoconta();
          break;
        case "Depositar":
          deposit();
          break;
        case "Consultar Saldo":
          getAccountBalance();
          break;

        case "Sacar":
          Withdraw();
          break;

        case "PIX":
          PIX();
          break;

        case "Sair":
          console.log(chalk.bgBlue.black("Obrigado por usar nosso programa"));
          process.exit();

        default:
          break;
      }
    })
    .catch((err) => console.log(err));
}

function criacaoconta() {
  console.log(chalk.bgGreen.black("Obrigado por escolher nosso serviço"));
  console.log(chalk.green("Defina as opções da sua conta a seguir"));
  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite um nome para sua conta",
      },
    ])
    .then((answer) => {
      const Accountname = answer["accountName"];
      console.info(Accountname);

      if (!fs.existsSync("Accounts")) {
        fs.mkdirSync("Accounts");
      }
      if (fs.existsSync(`Accounts/${Accountname}.json`)) {
        console.log(
          chalk.bgRed.black("Esta conta ja existe escolha outro nome")
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `Accounts/${Accountname}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green("Parabéns conta criada com sucesso!!"));
      operation();
    })
    .catch((err) => console.log(err));
}

//add an amount to user account

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      //verify if account exists
      if (!checkaccounr(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "Qual valor deseja adicionar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          //add an amount
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    });
}

function checkaccounr(accountName) {
  if (!fs.existsSync(`Accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("Esta conta não existe, escolha outra conta")
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const account = getaccount(accountName);

  if (!amount) {
    console.log("ocorreu um erro tente novamente mais tarde");
    return deposit();
  }

  account.balance = parseFloat(amount) + parseFloat(account.balance);

  fs.writeFileSync(
    `Accounts/${accountName}.json`,
    JSON.stringify(account),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(`Foi depositado um valor de R$${amount} na sua conta`)
  );
}

function getaccount(accountName) {
  const accountJSON = fs.readFileSync(`Accounts/${accountName}.json`, {
    encoding: "utf-8",
    flag: "r",
  });

  return JSON.parse(accountJSON);
}

//show account balance

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual nome da sua conta",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      //verify if account exists
      if (!checkaccounr(accountName)) {
        return getAccountBalance();
      }

      const account = getaccount(accountName);

      console.log(
        chalk.bgBlue.black(
          `Ola o saldo da sua conta é de R$ ${account.balance}`
        )
      );

      operation();
    })
    .catch((err) => console.log(err));
}

//Withdraw an amount from user account
function Withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkaccounr(accountName)) {
        return Withdraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "Quanto voce deseja sacar?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const account = getaccount(accountName);
  if (!amount) {
    console.log(chalk.red("Nenhum valor foi digitado, digite um valor"));
    return Withdraw();
  }

  if (account.balance < amount) {
    console.log(chalk.red("Você não tem esse valor!"));
    return Withdraw();
  }
  account.balace = parseFloat(account.balance) - parseFloat(amount);

  fs.writeFileSync(
    `Accounts/${accountName}.json`,
    JSON.stringify(account),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.bgGreen.bold(
      `Parabéns foi sacado o valor de R$${amount} da conta ${accountName}`
    )
  );
}

function PIX() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Qual nome da sua conta?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      if (!checkaccounr(accountName)) {
        return PIX();
      }
      inquirer
        .prompt([
          {
            name: "accountNameEnvio",
            message: "Digite o nome do usuario para o envio:",
          },
        ])
        .then((answer) => {
          const accountNameEnvio = answer["accountNameEnvio"];
          if (!checkaccounr(accountNameEnvio)) {
            return PIX();
          }
          inquirer
            .prompt([
              {
                name: "amount",
                message: "Qual valor deseja enviar?",
              },
            ])
            .then((answer) => {
              const amount = answer["amount"];
              if (!amount) {
                console.log("Nenhum valor digitado");
                return PIX();
              }
              enviarDinheiro(accountName, amount);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function enviarDinheiro(accountName, amount) {
  const account = getaccount(accountName);
  if (!amount) {
    console.log(chalk.red("Nenhum valor foi digitado, digite um valor"));
    return Withdraw();
  }

  if (account.balance < amount) {
    console.log(chalk.red("Você não tem esse valor!"));
    return operation();
  }
  account.balance = parseFloat(account.balance) - parseFloat(amount);

  fs.writeFileSync(
    `Accounts/${accountName}.json`,
    JSON.stringify(account),
    function (err) {
      console.log(err);
    }
  );

  console.log(`PIX enviado com sucesso no valor de R$${amount}`);
  operation();
}
