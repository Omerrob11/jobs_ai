const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    message: err.message || "משהו קרה",
    status: err.status || 500,
  });
};

module.exports = errorHandler;
