// core express application setup
// actually creating the application - what the application does

const express = require("express");
// CORS: web broswers prevent websites from making requests to different domains
// cors middleware make the requests possible
const cors = require("cors");
const cookieParser = require("cookie-parser");

//initilaize express application
const app = express();
const errorHandler = require("./middleware/errorMiddleware");
const { verifyUser } = require("./middleware/auth/loginMiddleware");
// const { verifyUserJwtToken } = require("./middleware/auth/verifyLoggedUser");
const verifyUserJwtToken = require("./middleware/auth/verifyLoggedUser");

const authRoutes = require("./routes/auth/authRoutes");
const publicRouter = require("./routes/public/publicRoutes");
const appRouter = require("./routes/app/appRouter");

// middleware for pasring json bodies
// meaning, we get data, and for each requests, we get the data in json, and we convert it to javascript objects
app.use(express.json()); // Middleware to parse JSON

// .use() -> adding middleware to express, where middleware does something to the request
// before passing it along. .use() do something for every requests
// enable cors for frontend communication, allows requests from our react app
app.use(cors());

// parsing cookie hader rom incoming requests, pouplate req.cookies with object containg cookie value.
// adding res.cookie() to respond with cookies
// without it we would manually have to parse cookies
app.use(cookieParser());

// routers

// any request to /auth will use the router
app.use("/auth", authRoutes);

// app prefix - this is for the protected features
// everything udner /app/* requires authentication
app.use("/app", verifyUserJwtToken, appRouter);

// specifi routes first, more general last
app.use("/", publicRouter);

app.use(errorHandler);
module.exports = app;
