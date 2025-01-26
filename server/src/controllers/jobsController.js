// handle buisness logic

const { createJob } = require("../models/jobsModel");

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
    console.error("failed in adding new job:", error);

    res.status(500).json({
      message: "שגיאה בהוספת עבודה חדשה",
    });
  }
};

module.exports = { postJob };
