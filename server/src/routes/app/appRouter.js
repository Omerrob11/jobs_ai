const express = require("express");
const appRouter = express.Router();

const jobsRouter = require("./jobs/jobRoutes");

// router.get("/dashboard", dashboardHandler);
appRouter.get("/dashboard", (req, res) => {
  res.json({ message: "ברוך הבא לדשבורד!", user: req.user });
});

appRouter.use("/jobs", jobsRouter);

module.exports = appRouter;
