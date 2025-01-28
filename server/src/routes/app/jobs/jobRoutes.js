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
- make an option to delete a job - by getting the job id (question how to do it, maybe it stored in jobs list or somwhere)
  alltouh, its client information, we trust him to get the corrrect job id?
  how can we get the correct job id without trust the client? is it even possible?
  as the client must tell you the correct id... i dont think is possible
  but it means, we trust the frontend to store the id somwhere to be avliable
  in our app, how are we do that?
- make an option to edit the job, and use the patch end point. also see that it is actually being edits
- use the get one job http request somehow
- create a log out endpoint and delete the cookie
- deploy the app


*/
