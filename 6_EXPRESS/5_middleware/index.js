const express = require("express");
const app = express();
const port = 3000;
const path = require ('path')

const basepath = path.join(__dirname, 'templates')


const checkAuth = function(req,res,next) {
  req.authStatus = true
  if (req.authStatus) {
    console.log("Logado")
    next()
  }else{
    console.log("Voce não está logado")
    next()
  }
}

app.use(checkAuth)

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`)
});

app.listen(port, () => {
  console.log(`Server being started on port${port}`);
});
