const boom = require('@hapi/boom');
//This closure receive the target (query allow to show the entity with its associate entity)
//if in the request don't have a query parameter (key lenght == 0), the execution continue the next middleware, but if the query isn't an empty object,
//try to access to the property (target) in the query, if it can, continue, else, send an error middleware
const queryValidator = (target) => {
  return (req, res, next) => {
    let query = req['query'];

    if (Object.keys(query).length > 0) {
      if (!query[target]) {
        next(boom.badRequest("This query parameter isn't allow"));
      }
    }
    next();
  };
};

module.exports = queryValidator;
