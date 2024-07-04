const express = require("express");
const router = express.Router();
const path = require("path");

const basepath = path.join(__dirname, "../templates");

router.get("/create", (req, res) => {
  res.sendFile(`${basepath}/userform.html`);
});

router.post("/save", (req, res) => {
  console.log(req.body);

  const nome = req.body.nome;
  const age = req.body.age;

  console.log(`O nome do usuario é ${nome} e ele tem ${age}`);

  res.sendFile(`${basepath}/userform.html`);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;

  console.log(`Estamos buscando pelo usuario: ${id}`);

  res.sendFile(`${basepath}/users.html`);
});

module.exports = router;
