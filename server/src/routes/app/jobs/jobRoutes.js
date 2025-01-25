const express = require("express");
const jobsRouter = express.Router();

const { validateJobEntry } = require("../../../middleware/jobs/jobsMiddleware");

module.exports = jobsRouter;

jobsRouter.post("/", validateJobEntry);
