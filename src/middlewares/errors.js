const consoleError = (err, req, res, next) => {
  console.error(err.message);
  next(err);
};

const sendingError = (err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,
  });
};

const sendingBoomError = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    console.error(err.stack)
    res.status(output.statusCode).json(output.payload);

  } else {
    next(err);
  }
}



module.exports = { consoleError, sendingError, sendingBoomError };
