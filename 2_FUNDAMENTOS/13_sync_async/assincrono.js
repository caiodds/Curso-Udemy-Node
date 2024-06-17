const fs = require("fs");

console.log("inicio");

fs.writeFile("Arquivo.txt", "Ola node", function (err) {
  setTimeout(() => {
    console.log("Arquivo criado");
  }, 1000);
});

console.log("fim");
