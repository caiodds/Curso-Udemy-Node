const express = require("express");
const app = express();
const port = 3000;
const path = require ('path')

const basepath = path.join(__dirname, 'templates')

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`)
});

app.listen(port, () => {
  console.log(`Server being started on port${port}`);
});
