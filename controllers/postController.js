const express = require("express");
const Post = require("../models/post");

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

async function getAllPosts(req, res) {
  Post.find().populate("author", "-password")
    .then((posts) => {
      res.status(200);
      res.render("blogs", { posts })
    }).catch((err) => {
      res.status(500);
      res.json({
        message: "Unable to get articles",
        err: err.message
      })
    })
}

async function getPostById(req, res) {
  const id = req.params.id;

  Post.findOneAndUpdate(
    {_id: id, state: "published"},
    { $inc: { read_count: 1}},
    { new: true }
  ).populate("author", "-password")
    .then((post) => {
      res.status(200);
      res.render("post", { post });
    }).catch((err) => {
      res.status(400);
      res.json({
        message: "Unable to get article",
        err: err.message
      })
    })
}

async function addPost(req, res) {
  const body = req.body;

  new Post({ ...body, author: req.user._id }).populate("author", "-password")
    .then((post) => {
      res.status(201);
      res.json({
        message: "Article added succesfully",
        data: post
      })
    }).catch((err) => {
      res.status(500);
      res.json({
        message: "Unable to add article",
        err: err.message
      })
    })
}

async function updatePost(req, res) {
  const id = req.params.id;
  const body = req.body;

  Post.findByIdAndDelete(id, body, { new: true }).populate("author", "-password")
    .then(() => {
      res.status(201).send("Article updated successfully!")
    }).catch((err) => {
      res.status(500);
      res.json({
        message: "Unable to update article",
        err: err.message
      })
    })
}

async function deletePost(req, res) {
  const id = req.params.id;

  Post.findByIdAndDelete(id).populate("author", "-password")
    .then(() => {
      res.status(200).send("Article deleted successfully");
    }).catch((err) => {
      res.status(500);
      res.json({
        message: "Unable to delete article",
        err: err.message
      })
    })
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost
}