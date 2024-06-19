const http = require("http")
const url = require('url')
const fs = require('fs')
const port = 3000


const serve = http.createServer((req, res) =>{
    fs.readFile('mensagem.html', function(err,data){
        res.writeHead(200,{'Content-Type': 'text/html'})
        res.write(data)
        return res.end()
    })
})

serve.listen(port, ()=> {
    console.log(`Servidor Rodando na porta: ${port}`)
})