
const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = require('./routers');
const db = require("./models");
const Todo = db.Todo;
const port=3000

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));



app.use(router)

app.listen(port, () => {
  console.log("Click : http://localhost:3000");
});

