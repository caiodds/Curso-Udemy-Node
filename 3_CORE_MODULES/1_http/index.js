const http = require("http")

const port = 3000


const serve = http.createServer((req, res) =>{

    res.write("oi http")
    res.end()
})

serve.listen(port, ()=> {
    console.log(`Servidor Rodando na porta: ${port}`)
})