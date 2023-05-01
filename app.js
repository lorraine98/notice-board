const express = require("express");
const { engine } = require("express-handlebars");
const mongodbConnection = require("./configs/mongodb-connection");

const app = express();

const TITLE = "notice board";

app.engine(
  "handlebars",
  handlebars.create({
    helpers: require("./configs/handlebars-helpers"),
  }).engine
);
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

let collection;
app.listen(3000, async () => {
  console.log("Server started");
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db("board").collection("post");
  console.log("MongoDB connected");
});
