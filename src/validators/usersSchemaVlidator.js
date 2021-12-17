const joi = require('joi');

const id = joi.number();
const email = joi.string().min(3).max(50);
const password = joi.string().min(3).max(20);
const role = joi.string().min(4).max(20);

const createSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
});

const putSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role,
})

const patchSchema = joi.object({
  email: email,
  password: password,
  role: role,
});

const deleteSchema = joi.object({
  id: id.required(),
});

const findOneSchema = joi.object({
  id: id.required(),
});

module.exports = { createSchema, putSchema, patchSchema, deleteSchema, findOneSchema };
