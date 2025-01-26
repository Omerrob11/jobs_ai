const pool = require("./database");

// unaothirized users can't acess it, because the endpiont
///app/jobs is block by the jwt - if they are un aothizred
// we will return a response that they are not autorized
// and we will not continue with the requestss
const createJob = async (
  userId,
  companyName,
  position,
  status,
  applicationDate,
  notes
) => {
  // try catch block help us detect if we have errors, that something is wrong
  // use for data operations, api call, etc
  try {
    const jobResult = await pool.query(
      "INSERT INTO jobs (user_id,company_name,position,status,application_date,notes) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",

      [userId, companyName, position, status, applicationDate, notes]
    );

    // we get back an object, that contain some informatio, for example, the command
    // we also get rows - the actual rows we inserted to the data
    // because we insert only one row here, we only care about the row we inserted
    // its in the rows[0]
    // and it will be an object containg the row you just entered, with all the row proerites from the db:
    // {id:1, user_id:123, company_name: google, etc...}
    return jobResult.rows[0];
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating job:", error);

    // Re-throw the error so the controller can handle it appropriately
    // we can have connection error, constratin vilations, data type error
    throw error;
  }
};

const getAllJobs = async (userId) => {
  try {
    const allJobsQueryResult = await pool.query(
      "SELECT * FROM jobs WHERE user_id =$1 ORDER BY created_at DESC",
      [userId]
    );

    // returning all jobs, not just the first
    // the rows are actually the data base rows
    return allJobsQueryResult.rows;
  } catch (error) {
    // throw error to the calling code
    throw error;
  }
};

const getJobsById = async (userId) => {};

module.exports = { createJob, getAllJobs, getJobsById };
