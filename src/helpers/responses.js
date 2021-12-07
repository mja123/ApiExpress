const succesful = (arrayElement, statusCode, message, res) => {
  res.status(statusCode).json({
    message: message,
    data: arrayElement
  });
};

const error = (statusCode, message, res) => {
  res.status(statusCode).json({
    error: message,
  });
};

const findId = (array, idFind, lastId) => {
  let found = false;
  for (let i = 0; i < lastId; i++) {
    if (array[i] == undefined) {
      continue;
    }
    if (array[i].id == idFind) {
      found = true;
      break;
    }
  }
  return found;
};

module.exports = { succesful, error, findId };
