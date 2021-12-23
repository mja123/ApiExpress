const joi = require('joi');

const id = joi.number().integer();
const name = joi.string().min(3).max(50);
const price = joi.number().integer().min(10);

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
})

const findOneSchema = joi.object({
  id: id.required(),
});

module.exports = { createSchema, patchSchema, findOneSchema, putSchema };
