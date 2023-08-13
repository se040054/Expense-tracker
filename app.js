const express = require("express");
const { engine } = require("express-handlebars");
const app = express();
const router = require("./routers/main"); //如果使用./router 只會預設尋找index.js
const port = 3000;
const methodOverride = require("method-override");
const session = require("express-session");

require("dotenv").config();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
const passport = require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(router);

app.listen(port, () => {
  console.log("Click : http://localhost:3000");
});
