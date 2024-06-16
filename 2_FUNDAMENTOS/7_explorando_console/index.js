//mais de um valor

const x = 10;
const y = "LKOP";
const z = [1, 2, 3];

console.log(x, y, z);

//contagem de impressões
console.count(`O valor de x é ${x}, contagem`);
console.count(`O valor de x é ${x}, contagem`);
console.count(`O valor de x é ${x}, contagem`);
console.count(`O valor de x é ${x}, contagem`);

//variavel entre string
console.log("o nome e %s ele é dev backend", y);

//limpar console

setTimeout(() => {
  console.clear();
}, 2000);
