const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", {
    title: "hello world",
    message: "nice to meet you",
    layout: false,
  });
});

app.listen(3000);
