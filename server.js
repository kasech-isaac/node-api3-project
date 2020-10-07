const express = require("express");

const userRouter = require("./users/userRouter");
const postRouter = require("./posts/postRouter");

const server = express();

//custom middleware
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}]().toISOString() ${req.method} ${req.url}`)
  next()
}
server.use(logger)

server.use(express.json());
server.use("/user",userRouter);
server.use("/post",postRouter);

// err mideleware
server.use((err, req, res, next)=>{
  console.log(err)
  res.status(500).json({
    message:"Something went wrong, please try again later",
  })
  })

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});




module.exports = server;
