// what about error handling?
// what is req.body? how we send information in the req object?

const pool = require("../../models/database");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10; // Make sure this is defined

const validateRegistration = (req, res, next) => {
  // req.body is the actual data the http request have - from client request
  // params/query are belongs to the path.
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "חובה למלא את כל השדות" });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("אימייל לא תקין");
    error.status = 400;
    throw error;
  }

  // Validate password strength
  if (password.length < 6) {
    const error = new Error("ססמא חייבת להיות לפחות 6 ספרות");
    error.status = 400;
    throw error;
  }

  if (username.length < 3) {
    const error = new Error("שם משתמש חייב להיות לפחות 3 ספרות");
    error.status = 400;
    // error handler middleware will catch it
    throw error;
  }

  // now we will have a new property on req object
  req.validateData = { email, password, username };

  //   continue to next middleware
  console.log("are we getting to here?");
  next();
};

const checkExistingUser = async (req, res, next) => {
  try {
    // deconstructing - basically, extract existing property from objects
    const { email, username } = req.validateData;

    const emailExists = await pool.query(
      `SELECT * FROM users WHERE email =$1`,
      [email]
    );
    const userNameExists = await pool.query(
      `SELECT * FROM users WHERE username =$1`,
      [username]
    );
    if (emailExists.rows.length > 0) {
      return res.status(400).json({ error: "אימייל כבר בשימוש" });
    }
    if (userNameExists.rows.length > 0) {
      return res.status(400).json({ error: "שם משתמש כבר בשימוש" });
    }

    console.log("are we getting to existing user?");
    next();
  } catch (error) {
    console.log("do we stop here?");
    next(error); // express will know to find the correct error middleware
    // because it has 4 paramaters, and we use .use(error handler)
  }
};

const hashPassword = async (req, res, next) => {
  console.log("Starting hashPassword");
  console.log("validateData:", req.validateData);
  try {
    const { password } = req.validateData;
    // salt- adding extra random char to it - change the pwd input a little bit
    // make the output unique
    const hashedPwd = await bcrypt.hash(password, SALT_ROUNDS);
    //we can also have a callback function to store it in the db
    req.validateData.hashedPassword = hashedPwd;
    console.log("are we getting to hashe password");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateInput: validateRegistration,
  checkExistingUser,
  hashPassword,
};
