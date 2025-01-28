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

const getJobById = async (jobId, userId) => {
  try {
    const jobQueryResult = await pool.query(
      "SELECT * FROM jobs WHERE id=$1 AND user_id = $2",
      [jobId, userId]
    );

    return jobQueryResult.rows[0]; //return undefined if not job found
  } catch (error) {
    throw error;
  }
};

const updateJob = async (jobId, userId, updates) => {
  // function to update job from the db.
  try {
    // the actual fileds it self
    const fields = Object.keys(updates);
    // values of the object diles
    const values = Object.values(updates);
    // how ever how many proeptries in updates object,
    // put job id, and user id, right after them with the correct paramatized
    const query = `UPDATE jobs SET ${fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ")} WHERE id = $${fields.length + 1} AND user_id = $${
      fields.length + 2
    } RETURNING *`;

    // getting the value from the query
    const updateJobQueryResult = await pool.query(query, [
      ...values,
      jobId,
      userId,
    ]);

    // rows === array of objects that are the actual rows
    // giving us the a row with the columns of the db
    // and the data we just got from each row
    return updateJobQueryResult.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteJobById = async (jobId, userId) => {
  try {
    const deletedJob = await pool.query(
      "DELETE FROM jobs WHERE id = $1 AND user_id = $2 RETURNING *",
      [jobId, userId]
    );

    return deletedJob.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteAllJobs = async (userId) => {
  try {
    const deletedJobs = await pool.query(
      "DELETE FROM jobs WHERE user_id = $1 RETURNING *",
      [userId]
    );

    return deletedJobs.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJobById,
  deleteAllJobs,
};
