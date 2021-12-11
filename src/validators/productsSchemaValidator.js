const joi = require('joi');

const id = joi.number();
const name = joi.string().min(3).max(20);
const price = joi.number().integer().min(1);

const createSchema = joi.object({
  name: name.required(),
  price: price.required(),
});

const updateSchema = joi.object({
  id: id.required(),
  name: name,
  price: price,
});

const deleteSchema = joi.object({
  id: id.required(),
});

const findOneSchema = joi.object({
  id: id.required(),
});

module.exports = { createSchema, updateSchema, deleteSchema, findOneSchema };
