const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

const TITLE = "notice board";

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home", {
    title: TITLE,
    message: "nice to meet you",
    layout: false,
  });
});

app.get("/write", (req, res) => {
  res.render("write", {
    title: TITLE,
  });
});

app.get("/detail/:id", async (req, res) => {
  res.render("detail", {
    title: TITLE,
  });
});

app.listen(3000);
