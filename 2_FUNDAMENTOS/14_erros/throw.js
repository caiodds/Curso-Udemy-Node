const x = "10"


//checar se x é um numero

if (!Number.isInteger(x)) {
    throw new Error("Valor de x não é um numero inteiro")
}

console.log("Continuando o codigo")