const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

const usersRouter = require("./users");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(express.static('public'))

const basepath = path.join(__dirname, "templates");

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

app.listen(port, () => {
  console.log(`Server being started on port${port}`);
});
