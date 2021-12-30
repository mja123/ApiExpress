const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class OrdersProductsService {
  async get() {
    try {
      const items = await models.OrdersProducts.findAll({
        include: ['order', 'product'],
      });
      return items;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
  async create(body) {
    try {
      const newItem = await models.OrdersProducts.create({
        orderId: body.orderId,
        productId: body.productId,
        amount: body.amount,
      });
      return newItem;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
}

module.exports = OrdersProductsService;
