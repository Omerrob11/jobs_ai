const { JOB_STATUS } = require("../../config/constants");
// notice, we mainly need middleware for changing the database
// not delete/get, for input new data, we need to validate the data
const validateJobEntry = async (req, res, next) => {
  const { companyName, position, status, applicationDate, notes } = req.body;
  // never trust client side data - it is not good, ever

  if (!companyName) {
    const error = new Error("חובה למלא את שם החברה");
    error.status = 400;
    throw error;
  }
  if (!position) {
    const error = new Error("חובה למלא תפקיד");
    error.status = 400;
    throw error;
  }

  req.body.companyName = companyName.trim();
  req.body.position = position.trim();

  const validHebrewStatuses = Object.keys(JOB_STATUS.statusToDb);

  //   if (status)
  if (status) {
    if (!validHebrewStatuses.includes(status)) {
      const error = new Error("סטטוס לא חוקי");
      error.status = 400;
      throw error;
    }

    req.body.status = JOB_STATUS.statusToDb[status];
  }

  if (applicationDate) {
    // Split the date by '/': deconsturcting, split creates array
    const [day, month, year] = applicationDate.split("/");
    // Rearrange to YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;

    // Now check if it's valid
    const dateObject = new Date(formattedDate);
    if (dateObject.toString() === "Invalid Date") {
      const error = new Error("תאריך לא תקין");
      error.status = 400;
      throw error;
    }

    // Convert to YYYY-MM-DD format for PostgreSQL
    req.body.applicationDate = formattedDate;
  }

  next();
};

const validateJobUpdate = async (req, res, next) => {
  // company_name
  // position
  // status
  // updated_at
  const { companyName, position, status, updatedAt, notes } = req.body;

  const updates = {};

  if (companyName) {
    updates.companyName = companyName.trim();
  }

  if (position) {
    updates.position = position.trim();
  }

  const validHebrewStatuses = Object.keys(JOB_STATUS.statusToDb);

  if (status) {
    if (!validHebrewStatuses.includes(status)) {
      const error = new Error("סטטוס לא חוקי");
      error.status = 400;
      throw error;
    }
    updates.status = JOB_STATUS.statusToDb[status];
  }

  if (updatedAt) {
    // Split the date by '/': deconsturcting, split creates array
    const [day, month, year] = updatedAt.split("/");
    // Rearrange to YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;

    // Now check if it's valid
    const dateObject = new Date(formattedDate);
    if (dateObject.toString() === "Invalid Date") {
      const error = new Error("תאריך לא תקין");
      error.status = 400;
      throw error;
    }

    updates.updatedAt = formattedDate;
  }

  // defensive api - we can acess it through postman, curl commands, etc
  // bugs: if frontend send bugs
  // security
  if (Object.keys(updates).length === 0) {
    const error = new Error("לא נשלחו שדות לעדכון");
    error.status = 400;
    return next(error);
  }

  // we only check for length and stuff.
  // the only thing that request can have
  // is to damage your db or something, but we got this in sql injection
  if (notes) {
    // Trim whitespace
    const trimmedNotes = notes.trim();

    // Check length (for example, max 1000 characters)
    if (trimmedNotes.length > 1000) {
      const error = new Error("הערות לא יכולות להיות ארוכות מ-1000 תווים");
      error.status = 400;
      return next(error);
    }
    updates.notes = trimmedNotes;
  }
  // create another property in the req object
  // seperate raw data from updated data
  req.updates = updates;
  next();
};

module.exports = { validateJobEntry, validateJobUpdate };
