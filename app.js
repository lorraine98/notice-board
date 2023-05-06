require("dotenv").config();

const express = require("express");
const { create } = require("express-handlebars");

const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

const TITLE = "notice board";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "handlebars",
  create({
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

const WRITE = "/write";

app.get(WRITE, (req, res) => {
  res.render("write", {
    title: TITLE,
  });
});

app.post(WRITE, async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${result.insertedId}`);
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
