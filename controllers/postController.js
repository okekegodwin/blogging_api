const express = require("express");
const Post = require("../models/post");

const app = express();

app.set("views", "views");
app.set("view engine", "ejs");

async function getAllPosts(req, res) {
  try {
    const posts = await Post.find().populate({
      path: "author",
      select: "-password"
    });

    res.status(200);
    res.render("blogs", { posts });

  } catch (error) {
    res.status(500);
    res.json({
      message: "Unable to get articles",
      err: error.message
    })
  }
}

async function getPostById(req, res) {
  try {
    const id = req.params.id;

    const post = await Post.findOneAndUpdate(
      {_id: id, state: "draft"},
      { $inc: { read_count: 1}},
      { new: true }
    ).populate({
      path: "author",
      select: "-password"
    });

    res.status(200);
    res.render("post", { post });

  } catch (error) {
    res.status(400);
      res.json({
      message: "Unable to get article",
      err: error.message
    })
  }
}

async function addPost(req, res) {
  try {
    const body = req.body;

    const post = await Post({ ...body, author: req.user._id }).populate({
      path: "author",
      select: "-password"
    });
    await post.save();

    res.status(201);
    res.json({
      message: "Article added succesfully",
      data: post
    })
  } catch (error) {
    res.status(500);
    res.json({
      message: "Unable to add article",
      err: err.message
    })
  }
}

async function updatePost(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    const post = await Post.findByIdAndUpdate(id, body, { new: true }).populate({
      path: "author",
      select: "-password"
    })

    res.status(201).send("Article updated successfully!");
  } catch (error) {
      res.status(500);
      res.json({
        message: "Unable to update article",
        err: error.message
      })
  }
}

async function deletePost(req, res) {
  try {
    const id = req.params.id;

    const post = await Post.findByIdAndDelete(id);

    res.status(200).send("Article deleted successfully");
  } catch (error) {
    res.status(500);
    res.json({
      message: "Unable to delete article",
      err: error.message
    })
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost
}