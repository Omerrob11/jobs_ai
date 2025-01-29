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
  patchJob,
  deleteJob,
} = require("../../../controllers/jobsController");
module.exports = jobsRouter;

// specific routes first
jobsRouter.post("/", validateJobEntry, postJob);

jobsRouter.get("/", getJobsList);
// we need to get jobs
// what middlewares do we need?
// lets start with the model then

// DYNAMIC ROUTES after:

// you can match any value, and save it with the variable id
// can acess in req.params.id
// meaning- we just save what he added to us in the paramater
jobsRouter.get("/:id", getJob);

// the request from the fronend will just be to patch
// we need the id of job
jobsRouter.patch("/:id", validateJobUpdate, patchJob);

jobsRouter.delete("/:id", deleteJob);

/*
TODO:
- create a log out endpoint and delete the cookie
- deploy the app - use enviormental variables, production 
vs non production enviorment
  so you understand the difference between the two and how it works
*/
