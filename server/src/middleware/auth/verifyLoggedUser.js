const jwt = require("jsonwebtoken");

const verifyUserJwtToken = (req, res, next) => {
  // do to cookie parser middleware
  const token = req.cookies.token;

  // we need to check, becuase the user might want to go directly in the url
  // to the protected routes
  // we should redirect here to the login page probably

  console.log("inside verify");
  if (!token) {
    // maybe here redirect to log in page
    // return res.status(401).json({
    //   error: "לא נמצא טוקן, אנא התחבר למערכת",
    // });

    const error = new Error("לא נמצא טוקן, אנא התחבר למערכת");
    error.status = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach username so we won't need to check again
    // it will be avilable for next middleware or routes
    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    // verify will throw error here if not works
    error.status = 401; // Set appropriate status for JWT errors
    error.message = "טוקן לא תקין - אנא התחבר מחדש";
    next(error);
  }
};

module.exports = verifyUserJwtToken;
