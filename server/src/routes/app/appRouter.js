const express = require("express");

const appRouter = express.Router();

// router.get("/dashboard", dashboardHandler);
appRouter.get("/dashboard", (req, res) => {
  res.json({ message: "ברוך הבא לדשבורד!", user: req.user });
});
module.exports = appRouter;
