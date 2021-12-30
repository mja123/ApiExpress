const joi = require('joi');

const id = joi.number();
const orderId = joi.number();
const productId = joi.number();
const amount = joi.number().min(1);

const ordersProductsCreate = joi.object({
  productId: productId.required(),
  orderId: orderId.required(),
  amount: amount,
});

const ordersProductsFind = joi.object({
  id: id.required(),
});

const ordersProductsPut = joi.object({
  orderId: orderId.required(),
  id: id.required(),
  amount: amount.required(),
  productId: productId.required(),
});

const ordersProductsPatch = joi.object({
  amount: amount,
  id: id.required(),
  productId: productId,
  orderId: orderId,
});

module.exports = {
  ordersProductsCreate,
  ordersProductsFind,
  ordersProductsPut,
  ordersProductsPatch,
};
