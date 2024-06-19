const http = require("http")
const url = require('url')
const fs = require('fs')
const port = 3000


const serve = http.createServer((req, res) =>{
    const urlInfo = require("url").parse(req.url, true)
    const name = urlInfo.query.name

    if (!name) {
        fs.readFile('index.html', function(err,data){
            res.writeHead(200,{'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        })
    }else{
        const nameNewline = name + ",\r\n"


        fs.appendFile("arquivo.txt",nameNewline,function(err,data){
            res.writeHead(302,{
                Location: '/',
            })
            return res.end()
        })
    }

   
})

serve.listen(port, ()=> {
    console.log(`Servidor Rodando na porta: ${port}`)
})