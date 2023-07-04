const { Router } = require("express");
const { BlogsModel } = require("../model/blog.model");
const { authentication } = require("../middleware/authentication");
const blogsRouter = Router();

//get all
blogsRouter.get("/", async (req, res) => {
  const result = await BlogsModel.find();
  res.send(result);
});

//get by registred user
blogsRouter.get("/myblogs", authentication, async (req, res) => {
  const result = await BlogsModel.find({ userId: req.body.userId });
  res.send(result);
});

//post
blogsRouter.post("/create", authentication, async (req, res) => {
  const { title, image, intro, description, date, userId } = req.body;
  const blog = new BlogsModel({
    title,
    image,
    intro,
    description,
    date,
    userId,
  });
  await blog.save();
  res.send(blog);
});

//delete
blogsRouter.delete("/delete/:blogID", authentication, async (req, res) => {
  const { blogID } = req.params;
  const deleteBlog = await BlogsModel.findOneAndDelete({
    _id: blogID,
    userId: req.body.userId,
  });
  if (deleteBlog) {
    res.send({ msg: "deleted" });
  } else {
    res.send({ msg: "blog not found" });
  }
});

//patch
blogsRouter.patch("/edit/:blogID", authentication, async (req, res) => {
  const { blogID } = req.params;
  try {
    const blog = await BlogsModel.findOne({
      _id: blogID,
      userId: req.body.userId,
    });

    if (req.body.title) {
      blog.title = req.body.title;
    }

    if (req.body.image) {
      blog.image = req.body.image;
    }

    if (req.body.intro) {
      blog.intro = req.body.intro;
    }

    if (req.body.description) {
      blog.description = req.body.description;
    }

    if (req.body.date) {
      blog.date = req.body.date;
    }

    await blog.save();
    res.send(blog);
  } catch (error) {
    res.status(404);
    res.send({ error: "blog not found" });
  }
});

module.exports = {
  blogsRouter,
};
