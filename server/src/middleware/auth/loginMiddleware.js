const pool = require("../../models/database");

const validateUserCred = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    const error = new Error("חובה להכניס גם שם משתמש וגם ססמא");
    error.status = 400;
    throw error;
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
      res.status(401).json({ error: "שם משתמש או סיסמא אינם תקינים" });
    }

    const isMatch = await bcrypt.compare(
      password,
      userName.rows[0].password_hash
    );

    if (!isMatch) {
      return res.status(401).json({ error: "שם משתמש או סיסמא אינם תקינים" });
    }
  } catch (error) {}
};
