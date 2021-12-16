const joi = require('joi');

const id = joi.number();
const email = joi.string().min(3).max(50);
const password = joi.string().min(3).max(20);

const createSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

const updateSchema = joi.object({
  id: id.required(),
  email: email,
  password: password,
});

const deleteSchema = joi.object({
  id: id.required(),
});

const findOneSchema = joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, deleteSchema, findOneSchema };
