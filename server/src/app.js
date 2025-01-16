// core express application setup
// actually creating the application - what the application does

const express = require("express");
// CORS: web broswers prevent websites from making requests to different domains
// cors middleware make the requests possible
const cors = require("cors");

//initilaize express application
const app = express();
const errorHandler = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");

// middleware for pasring json bodies
// meaning, we get data, and for each requests, we get the data in json, and we convert it to javascript objects
app.use(express.json()); // Middleware to parse JSON

// .use() -> adding middleware to express, where middleware does something to the request
// before passing it along. .use() do something for every requests
// enable cors for frontend communication, allows requests from our react app
app.use(cors());

// routers

// any request to /auth will use the router
app.use("/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Healthy", message: "server is running propertly" });
});

app.get("/new", (req, res) => {
  res.json({ post: "lol" });
});

app.get("/", (req, res) => {
  console.log("users will be logged inside here");
  // broswer show you the raw json response with res.json
  // our frontend application will consume the response and present it later
  res.json({
    message: "welcome to interview prep api",
    version: "1.0.0",
  });
});

app.use(errorHandler);
module.exports = app;
