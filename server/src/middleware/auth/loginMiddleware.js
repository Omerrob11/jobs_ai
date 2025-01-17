const pool = require("../../models/database");
const jwt = require("jsonwebtoken");

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

const userTokenCreation = async (req, res, next) => {};

module.exports = { validateUserCred, verifyUser };
