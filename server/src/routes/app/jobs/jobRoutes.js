const express = require("express");
const jobsRouter = express.Router();

const { validateJobEntry } = require("../../../middleware/jobs/jobsMiddleware");
const { postJob } = require("../../../controllers/jobsController");
module.exports = jobsRouter;

jobsRouter.post("/", validateJobEntry, postJob);

jobsRouter.get("/");
// we need to get jobs
// what middlewares do we need?
// lets start with the model then
