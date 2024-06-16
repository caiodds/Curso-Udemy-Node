import chalk from "chalk"

const nota = 3

if(nota >=7){
    console.log(chalk.green("Parabéns Você Passou!"))
}else{
    console.log(chalk.bgRed.black.bold("Você Foi reprovado!"))
}