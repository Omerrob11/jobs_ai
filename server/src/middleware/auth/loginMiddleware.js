const pool = require("../../models/database");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const validateUserCred = (req, res, next) => {
  const { username, password } = req.body;

  // best practice
  if (!username || !password) {
    const error = new Error("חובה להכניס גם שם משתמש וגם ססמא");
    error.status = 400;
    // make sure the other next() will not run
    // no need for try / catch, we can just return next(error)
    // in a try/catch clause, we will just use next(error)
    return next(error);
  }

  next();
};

const verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  // check if we have a username and password like this
  //   if yes return good, credentials are good
  // if not, return bad, credentials are bad

  try {
    const userName = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (userName.rows.length === 0) {
      // we return to not continue the function - there is code later
      return res.status(401).json({ error: "שם משתמש או סיסמא אינם תקינים" });
    }

    const isMatch = await bcrypt.compare(
      password,
      userName.rows[0].password_hash
    );

    if (!isMatch) {
      return res.status(401).json({ error: "שם משתמש או סיסמא אינם תקינים" });
    }

    // {id:1, username:"john_Dow", ...} - all the filed we get from the database

    // saving the user information in the req object
    req.user = userName.rows[0];

    next();
  } catch (error) {
    return next(error);
  }
};

const generateToken = async (req, res, next) => {
  console.log("Starting generateToken");
  console.log("User id:", req.user.id);
  const userId = req.user.id;

  // data stored in the token
  const payload = {
    userId: userId,
  };

  console.log("Payload:", payload); // Check payload
  console.log("JWT_SECRET:", process.env.JWT_SECRET); //
  try {
    console.log("Attempting to generate token");
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "72h",
    });
    console.log("Token generated:", token);

    req.token = token;
    console.log("post req.token");
    next();
  } catch (error) {
    console.error("Token generation error:", error);

    return next(error);
  }
};

module.exports = { validateUserCred, verifyUser, generateToken };
