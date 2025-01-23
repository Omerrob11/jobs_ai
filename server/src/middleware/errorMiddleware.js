const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  const messages = {
    400: "בקשה לא תקינה",
    401: "אין הרשאה",
    403: "גישה נדחתה",
    404: "לא נמצא",
    500: "שגיאת שרת",
  };
  console.error("Error:", err);
  res.status(status).json({
    message: err.message || messages[status] || "משהו קרה",
    status: status,
  });
};

module.exports = errorHandler;
