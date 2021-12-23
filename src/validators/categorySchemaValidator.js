const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(30);

const createCategory = joi.object({
  name: name.required(),
});

const findOneCategory = joi.object({
  id: id.required(),
});

module.exports = { findOneCategory, createCategory };
