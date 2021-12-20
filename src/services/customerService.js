const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class customerService {
  async get() {
    try {
      const allCustomers = await models.Customer.findAll();
      return allCustomers;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  async create(body) {
    try {
      const createCustomer = await models.Customer.create({
        name: body.name,
        lastName: body.lastName,
        phone: body.phone,
      });
      return createCustomer;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
  async findOne(id) {
    const customer = await models.Customer.findOne({
      where: {
        id: id,
      },
    });
    if (customer != null) {
      return customer;
    } else {
      throw boom.notFound('Customer not found');
    }
  }
  async put(id, body) {
    try {
      const customer = await this.findOne(id);
      const puttingCustomer = await customer.update({
        name: body.name,
        lastName: body.lastName,
        phone: body.phone,
      });
      return puttingCustomer;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
  async delete(id) {
    try {
      const customer = await this.findOne(id);
      const deletingCustomer = await customer.destroy();
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
}

module.exports = customerService;
