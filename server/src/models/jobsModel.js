const pool = require("./database");

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

    return jobResult.rows[0];
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating job:", error);

    // Re-throw the error so the controller can handle it appropriately
    throw error;
  }
};
