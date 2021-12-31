const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const price = joi.number().integer().min(10);
const price_min = joi.number().integer();
const price_max = joi.number().integer();
const limit = joi.number().integer();
const offset = joi.number().integer();
const category = joi.boolean();

const categoryId = joi.number().integer();

const createSchema = joi.object({
  name: name.required(),
  price: price.required(),
  categoryId: categoryId.required(),
});

const putSchema = joi.object({
  name: name.required(),
  price: price.required(),
  categoryId: categoryId.required(),
});
const patchSchema = joi.object({
  name: name,
  price: price,
  categoryId: categoryId,
});

const findOneSchema = joi.object({
  id: id.required(),
});

const querySchema = joi.object({
  category,
  limit,
  offset,
  price,
  price_min,
  price_max,
});

module.exports = { createSchema, patchSchema, findOneSchema, putSchema, querySchema };
