// handle database operation
const pool = require("./database");

const createUser = async (email, username, hashedPassword) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (email,username,password_hash) VALUES ($1,$2,$3) RETURNING *`,
      [email, username, hashedPassword]
    );

    console.log(result.rows[0]);

    //result is an object, and the rows, its an array of objects.
    // rows[0] will be the first object,  and it will be the data we get back
    return result.rows[0];
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating job:", error);

    // Re-throw the error so the controller can handle it appropriately
    throw error;
  }
};

module.exports = {
  createUser,
};
