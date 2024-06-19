const http = require("http")
const url = require('url')
const port = 3000


const serve = http.createServer((req, res) =>{
    const urlInfo = require('url').parse(req.url, true)
    const name = urlInfo.query.name

    res.statusCode = 200
    res.setHeader('Contenty-Type','text/html')
    if (!name) {
        res.end('<h1>Preencha o seu nome:</h1> <form method="GET"><input type="text" name="name" placeholder="Digite seu nome" /> <input type="submit" value="enviar" /></form>')
    }else{
        res.end(`<h1> Seja bem vindo ${name}!</h1>`)
    }
})

serve.listen(port, ()=> {
    console.log(`Servidor Rodando na porta: ${port}`)
})