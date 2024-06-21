const path = require('path')

//path absoluto
console.log(path.resolve('teste.txt'))

// formar path
const midFolder = 'relatorio'
const fileName = 'caio.txt'

const finalPath = path.join('/', 'Arquivos', midFolder, fileName)

console.log(finalPath)