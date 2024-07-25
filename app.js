require("dotenv").config();

const express = require("express");

const rateLimit = require("express-rate-limit");
const { connectMongodb } = require("./connect_db");
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,
  limit: 4,
  standardHeaders: "draft-7",
  legacyHeaders: false
})

// Connect to the DB
connectMongodb();

app.set("views", "views");
app.set("view engine", "ejs");

require("./authentication/auth");

app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());
app.use(limiter);

app.use("/auth", authRoute);
app.use("/posts", postsRoute);

app.get("/", limiter, (req, res) => {
  // res.render("index");
  res.status(200).send("Home Page");
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