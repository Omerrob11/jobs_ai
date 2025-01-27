const express = require("express");
const jobsRouter = express.Router();

const {
  validateJobEntry,
  validateJobUpdate,
} = require("../../../middleware/jobs/jobsMiddleware");
const {
  postJob,
  getJobsList,
  getJob,
} = require("../../../controllers/jobsController");
module.exports = jobsRouter;

jobsRouter.post("/", validateJobEntry, postJob);

jobsRouter.get("/", getJobsList);
// we need to get jobs
// what middlewares do we need?
// lets start with the model then

// you can match any value, and save it with the variable id
// can acess in req.params.id
// meaning- we just save what he added to us in the paramater
jobsRouter.get("/:id", getJob);

// the request from the fronend will just be to patch
jobsRouter.patch("/:id", validateJobUpdate);

// who is milo?
// what is his characteristics? does he full of confidence?
// can you play him?
