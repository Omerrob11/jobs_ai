const express = require("express");
const jobsRouter = express.Router();

const { validateJobEntry } = require("../../../middleware/jobs/jobsMiddleware");
const { postJob } = require("../../../controllers/jobsController");
module.exports = jobsRouter;

jobsRouter.post("/", validateJobEntry, postJob);
