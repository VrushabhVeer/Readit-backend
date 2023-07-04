const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  intro: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  userId: { type: String, required: true },
});

const BlogsModel = mongoose.model("blog", blogsSchema);

module.exports = {
  BlogsModel,
};
