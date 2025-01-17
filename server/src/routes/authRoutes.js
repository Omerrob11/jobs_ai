// handle the logic

// we need:
// /auth/register route
// /auth/login route

const express = require("express");
const router = express.Router();

// nodejs automatically looks for .js files.
// only need to use extenstion for non js file like .json, or when use modules (import/export)
// also, we bsaically export/ import an object we can deconstruct it
const {
  validateInput,
  checkExistingUser,
  hashPassword,
} = require("../middleware/auth/registerMiddleware");

const {
  validateUserCred,
  verifyUser,
} = require("../middleware/auth/loginMiddleware");

const {
  registerHandler,
  loginHandler,
} = require("../controllers/authController");
// going to web broswer make get request, not post
router.post(
  "/register",
  validateInput,
  checkExistingUser,
  hashPassword,
  registerHandler
);

router.post("/login", validateUserCred, verifyUser, loginHandler);

router.get("/signin", (req, res) => {
  // the callback function is what happen after we go to /sign route
  // its basiclly the route handleer
  res.json({ message: "this is sign endpoint" });
});

module.exports = router;
