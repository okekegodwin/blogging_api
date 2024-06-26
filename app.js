require("dotenv").config();

const express = require("express");

const { connectMongodb } = require("./connect_db");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the DB
connectMongodb();

app.set("views", "views");
app.set("view engine", "ejs");

require("./authentication/auth");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

app.use("/auth", authRoute);
app.use("/posts", postsRoute);

app.get("/", (req, res) => {
  res.render("index");
})

app.get("/signup", (req, res) => {
  res.render("register");
})

app.get("/login", (req, res) => {
  res.render("login");
}) 

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
})