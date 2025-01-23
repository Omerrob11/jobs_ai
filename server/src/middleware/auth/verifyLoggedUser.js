const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  // do to cookie parser middleware
  const token = req.cookies.token;

  // we need to check, becuase the user might want to go directly in the url
  // to the protected routes
  // we should redirect here to the login page probably
  if (!token) {
    // maybe here redirect to log in page
    return res.status(401).json({
      error: "לא נמצא טוקן, אנא התחבר למערכת",
    });
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
    return res.status(401).json({
      error: "טוקן לא תקין - אנא התחבר מחדש",
    });
  }
};

module.exports = verifyUser;
