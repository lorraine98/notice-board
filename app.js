require("dotenv").config();

const express = require("express");
const { create } = require("express-handlebars");

const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

const TITLE = "notice board";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/"));

app.engine(
  "handlebars",
  create({
    helpers: require("./configs/handlebars-helpers"),
  }).engine
);

app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  try {
    const [posts, paginator] = await postService.list(collection, page, search);

    res.render("home", {
      title: TITLE,
      search,
      paginator,
      posts,
      layout: false,
    });
  } catch (error) {
    console.error(error);
    res.render("home", { title: "ERROR" });
  }
});

const WRITE = "/write";

app.get(WRITE, (req, res) => {
  res.render("write", {
    title: TITLE,
    mode: "create",
  });
});

app.post(WRITE, async (req, res) => {
  const post = req.body;
  const result = await postService.writePost(collection, post);
  res.redirect(`/detail/${result.insertedId}`);
});

app.get("/modify/:id", async (req, res) => {
  const { id } = req.params;
  const post = await postService.getPostById(collection, id);

  res.render("write", { title: TITLE, mode: "modify", post });
});

app.post("/modify/", async (req, res) => {
  const { id, title, writer, password, content } = req.body;

  const post = {
    title,
    writer,
    password,
    content,
    createdDt: new Date().toISOString(),
  };

  try {
    postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
  } catch (error) {
    throw new Error("Cannot update post");
  }
});

app.get("/detail/:id", async (req, res) => {
  const { id } = req.params;
  const result = await postService.getDetailPost(collection, id);
  res.render("detail", {
    title: TITLE,
    post: result.value,
  });
});

app.post("/check-password", async (req, res) => {
  const { id, password } = req.body;

  const post = await postService.getPostByIdAndPassword(collection, {
    id,
    password,
  });

  if (post) {
    return res.json({ isExist: true });
  } else {
    return res.status(404).json({ isExist: false });
  }
});

let collection;

app.listen(3000, async () => {
  console.log("Server started");
  const mongoClient = await mongodbConnection();
  collection = mongoClient.db("board").collection("post");
  console.log("MongoDB connected");
});
