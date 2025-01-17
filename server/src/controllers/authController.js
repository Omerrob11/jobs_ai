const pool = require("../models/database");
const { createUser } = require("../models/userModel");
// register controller
// now after we validate registiration, we can now create it to the database

// Tasks:
// 1. create the user to the database
// return sucsuss or failule
const registerHandler = async (req, res, next) => {
  console.log("Inside register controller"); // See if we get here

  try {
    const { email, username, hashedPassword } = req.validateData;
    // await: returns the actual data
    // without await you will get a pending promise
    const newUser = await createUser(email, username, hashedPassword);

    // if we are not getting error;
    console.log("register sucsueed");
    res.status(201).json({
      message: "משתמש נוצר בהצלחה",
      user: {
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error); // Log any errors

    res.status(500).json({
      message: "שגיאה ביצירת משתמש",
    });
  }
};

const loginHandler = async (req, res, next) => {
  try {
  } catch (error) {}
};

module.exports = { registerHandler, loginHandler };
