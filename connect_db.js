const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

function connectMongodb() {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connected to DB Successfully");
  })

  mongoose.connection.on("error", () => {
    console.log("Connection to MongoDB failed!");
  })
}

module.exports = { connectMongodb };