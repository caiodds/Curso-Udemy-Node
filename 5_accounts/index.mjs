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

            break;
        case "Consultar Saldo":

            break;
        case "Depositar":

            break;
        case "Sacar":

            break;

        case "Sair":
            console.log(chalk.bgBlue.black("Obrigado por usar nosso programa"))
            process.exit()

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