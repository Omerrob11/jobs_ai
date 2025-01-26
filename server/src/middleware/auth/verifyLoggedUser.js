const jwt = require("jsonwebtoken");

const verifyUserJwtToken = (req, res, next) => {
  // do to cookie parser middleware
  const token = req.cookies.token;

  // we need to check, becuase the user might want to go directly in the url
  // to the protected routes
  // we should redirect here to the login page probably

  console.log("inside verify");
  if (!token) {
    // maybe here redirect to log in page if its a page request - we want to recieve html in page requests
    // or a message "please logged in again" if its api request -we  want to recieve data in api request
    // return res.status(401).json({
    //   error: "לא נמצא טוקן, אנא התחבר למערכת",
    // });

    const error = new Error("לא נמצא טוקן, אנא התחבר למערכת");
    error.status = 401;
    return next(error);
  }

  try {
    // we already have the user id.
    // we will get here only after the user is loged in,
    // meaning - he will have a cookie and make requests only if he logged in
    // so we don't need the password again, this is a mechanisem to not need the password
    // we get the userid from the token
    // i think here we could also have a function
    // like a callabck function
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded contain the payload: {userId:123} - the data we orignaly sotre in it

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
