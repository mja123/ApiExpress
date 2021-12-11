const joi = require('joi');

const id = joi.number();
const name = joi.string().min(3).max(20);

const createSchema = joi.object({
  name: name.required(),
});

const updateSchema = joi.object({
  id: id.required(),
  name: name.required(),
});

const deleteSchema = joi.object({
  id: id.required(),
});

const findOneSchema = joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, deleteSchema, findOneSchema };
