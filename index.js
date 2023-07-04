const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { blogsRouter } = require("./routes/blog.route");
require("dotenv").config();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to readit");
});

app.use("/user", userRouter);
app.use("/blogs", blogsRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("connected to db successfully");
  } catch (error) {
    console.log("error to connecting db");
    console.log(error);
  }
  console.log("server is running");
});
