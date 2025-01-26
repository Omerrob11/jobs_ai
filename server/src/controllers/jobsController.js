// handle buisness logic

const { createJob, getAllJobs, getJobsById } = require("../models/jobsModel");

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
  const userId = req.user.userId;
};

module.exports = { postJob, getJobsList };
