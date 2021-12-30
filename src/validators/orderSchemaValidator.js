const joi = require('joi');

const id = joi.number();
const state = joi.string().min(3);
const customerId = joi.number();

const orderCreate = joi.object({
  customerId: customerId.required(),
});

const orderFind = joi.object({
  id: id.required(),
});

const orderPut = joi.object({
  state: state.required(),
  id: id.required(),
  customerId: customerId.required(),
})

const orderPatch = joi.object({
  state: state,
  id: id.required(),
  customerId: customerId,
})

module.exports = { orderFind, orderCreate, orderPut, orderPatch };
