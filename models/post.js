const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  body: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },
  read_count: {
    type: Number,
    defualt: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("post", postSchema);