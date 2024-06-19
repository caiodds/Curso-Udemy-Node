const http = require("http")

const port = 3000


const serve = http.createServer((req, res) =>{
    res.statusCode = 200
    res.setHeader('Contenty-Type','text/html')
    res.end('<h1>Olá, esté é o meu primeiro serve em html</h1><p>Testandooo</p>')
})

serve.listen(port, ()=> {
    console.log(`Servidor Rodando na porta: ${port}`)
})