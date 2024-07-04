const express = require ('express')
const app = express()
const port = 5000
const path = require('path')

const rotas = require('./rotas/route')

app.use(
    express.urlencoded({
      extended: true,
    })
  );
  
  app.use(express.json());
  
  app.use(express.static('public'))
  
  const basepath = path.join(__dirname, "templates");
  
  
  app.use("./rotas", rotas);


  app.get("/", (req, res) => {
    res.sendFile(`${basepath}/home.html`);
  });

  app.use((function(req,res,next) {
    res.status(404).sendFile(`${basepath}/404.html`)
  }))
  
  app.listen(port, () => {
    console.log(`Server being started on port${port}`);
  });
  