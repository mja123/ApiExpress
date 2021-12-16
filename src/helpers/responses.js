const succesful = (arrayElement, statusCode, message, res) => {
  res.status(statusCode).json({
    message: message,
    data: arrayElement
  });
};


module.exports = succesful;
