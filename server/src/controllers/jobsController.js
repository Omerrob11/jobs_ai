// handle buisness logic

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJobById,
  deleteAllJobs,
} = require("../models/jobsModel");

// controllers should have http verb based names - pust,get,put
// models should be action names, createjob, findjob, etc - they describe the db opertion
// controlelrs are to handle http requests, models are to preform db operations
const postJob = async (req, res, next) => {
  try {
    // create controller
    // understand where to get the UserId to send to the createJob function
    const { companyName, position, status, applicationDate, notes } = req.body;
    const userId = req.user.userId;

    // we get the new job record from the database
    const newJob = await createJob(
      userId,
      companyName,
      position,
      status,
      applicationDate,
      notes
    );

    console.log("sucsucc in createing new job");

    res.status(201).json({
      message: "הוספת משרה חדשה בהצלחה",
      job: {
        companyName: newJob.companyName,
        position: newJob.position,
        status: newJob.status,
        applicationDate: newJob.applicationDate,
        notes: newJob.notes,
      },
    });
    console.log("here we good?");

    // add it to the db, inside the models
  } catch (error) {
    console.error("failed in adding  new job:", error);

    res.status(500).json({
      message: "שגיאה בהוספת עבודה חדשה",
    });
  }
};

const getJobsList = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const allJobsList = await getAllJobs(userId);

    const responseMessage =
      allJobsList.length > 0 ? "משרות נטענו בהצלחה" : "לא נמצאו משרות";
    res.status(200).json({
      // sucsuss - help frontend code check easily about the request sucseed or not
      success: true,
      message: responseMessage,
      data: {
        jobs: allJobsList,
        totalJobs: allJobsList.length,
        // if hasjobs false, than we will show a message "create first job!"
        hasJobs: allJobsList.length > 0,
      },
    });
  } catch (error) {
    console.error("failed in fetching all jobs", error);
    // same structure as the getJobsList
    res.status(500).json({
      success: false,
      message: "שגיאה בטעינת המשרות",
      error: error.message, // In production, you might want to be more careful about exposing error details
    });
  }
};

const getJob = async (req, res, next) => {
  const jobId = +req.params.id; // we get it from route paramaters
  const userId = req.user.userId;

  // usualy users interact with the interact
  // but we need to check if maybe someone try to pase the url
  if (isNaN(jobId)) {
    return res.status(400).json({
      success: false,
      message: "מזהה משרה לא תקין", // Invalid job ID
      error: "Job ID must be a number",
    });
  }

  try {
    const job = await getJobById(jobId, userId);

    // if job is not found
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "משרה לא נמצאה", // Job not found
        data: { jobId },
      });
    }

    res.status(200).json({
      success: true,
      message: "המשרה נמצאה בהצלחה",
      data: {
        job: job,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "שגיאה בטעינת המשרה",
      error: error.message,
    });
  }
};

// controller should talk with the db, and update the job
// than, send a response
const patchJob = async (req, res, next) => {
  // get jobId somehow - see how you did it earlier
  // get userId

  // why put id, and not job Id in the /:id thing?
  const jobId = +req.params.id;
  const userId = req.user.userId;
  const updates = req.updates;

  if (isNaN(jobId)) {
    return res.status(400).json({
      success: false,
      message: "מזהה משרה לא תקין", // Invalid job ID
      error: "Job ID must be a number",
    });
  }

  try {
    const updatedJob = await updateJob(jobId, userId, updates);
    // check something here

    // will happend if jobId doesnt exist, job belong to a differet user
    // we will get undefined from it
    if (!updatedJob) {
      return res.status(404).json({
        // we defend against the unlikely case that jobId is not existed
        success: false,
        message: "משרה לא נמצאה או שאין לך הרשאה לערוך אותה",
        data: { jobId },
      });
    }

    res.status(200).json({
      success: true,
      message: "המשרה עודכנה בהצלחה",
      data: {
        job: updatedJob,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "שגיאה בעדכון המשרה",
      error: error.message,
    });
  }

  // what validation we need here?
  // what if the query didn't find anything for example?
};

const deleteJob = async (req, res, next) => {
  try {
    const jobId = +req.params.id;
    const userId = req.user.userId;

    if (isNaN(jobId)) {
      return res.status(400).json({
        success: false,
        message: "מזהה משרה לא תקין",
        error: "Job ID must be a number",
      });
    }
    const deletedJob = await deleteJobById(jobId, userId);

    if (!deletedJob) {
      return res.status(404).json({
        success: false,
        message: "המשרה שניסית למחוק לא נמצאה",
        data: { jobId },
      });
    }

    res.status(200).json({
      success: true,
      message: "המשרה נמחקה בהצלחה",
      data: {
        job: deletedJob,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "שגיאה במחיקת המשרה",
      error: error.message,
    });
  }
};

const deleteJobList = async (req, res, next) => {
  // do that like get all job list
  // and add the route
};
module.exports = { postJob, getJobsList, getJob, patchJob, deleteJob };
