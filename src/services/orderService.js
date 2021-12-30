const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class OrderService {

  async get() {
    try {
      const orders = await models.Order.findAll({
        include: [
          {
            association: 'customer',
            include: 'user',
          },
        ],
      });
      return orders;
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
  async create(body) {
    try {
      const newOrder = await models.Order.create(body);
      return newOrder;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
  // async calculateTotal() {
  //   const order = await models.Order.findAll({
  //     include: 'items'
  //   })

  //   const totalPrice = order.reduce(async (total, item) => {
  //     const priceForItem = item.items.reduce((totalItem, product) => {
  //       console.log(product.price)
  //       return totalItem + (product.price);
  //     }, 0);
  //     const amountOfItems = await models.OrdersProducts.findOne({
  //       where: {
  //         orderId: item.id,
  //       },
  //     },);
  //     return total + (priceForItem * amountOfItems.amount) 
  //   }, 0) 
  //   return totalPrice;
  // }
}

module.exports = OrderService;
