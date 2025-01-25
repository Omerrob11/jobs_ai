const JOB_STATUS = require("../../config/constants");
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
};

module.exports = { validateJobEntry };
