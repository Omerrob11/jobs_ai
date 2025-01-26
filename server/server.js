// server.js => entry point of our application, make the application run on the PORT

// dotenv -> loads enviormental variables from .env - where envioremtnal variables are secret notes
// so it read our .env, and make it avilable in process.env.
require("dotenv").config();
// require: import system - require functions return what the module exports
const app = require("./src/app"); // import our express app configuration

// getting the port
const PORT = process.env.PORT || 3000;

// port - which door number to open
// second argument its callback function, runs it after the server is running

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  console.log("Try accessing http://localhost:" + PORT);
});

// callback - what to do later on, a function we pass ass paramater
