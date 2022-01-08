const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('./../libs/sequelize');

class customerService {
  async get(includeUser) {
    try {
      let allCustomers = {};
      if (includeUser == 'true') {
        allCustomers = await models.Customer.findAll({
          include: 'user',
        });
      } else {
        allCustomers = await models.Customer.findAll({
          include: 'order',
        });
      }
      return allCustomers;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  async create(body, includeUser) {
    try {
      let createCustomer;

      if (includeUser == 'true') {
        const hashPassword = await bcrypt.hash(body.user.password, 8);
        const userSecureData = {
          ...body.user,
          password: hashPassword,
        };
        const newUser = await models.User.create(userSecureData);

        createCustomer = await models.Customer.create({
          name: body.name,
          lastName: body.lastName,
          phone: body.phone,
          userId: newUser.id,
        });
        console.log(createCustomer);
      } else {
        createCustomer = await models.Customer.create({
          name: body.name,
          lastName: body.lastName,
          phone: body.phone,
          userId: body.userId,
        });
      }

      return createCustomer;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
  async findOne(id, includeUser) {
    let customer;
    if (includeUser == 'true') {
      customer = await models.Customer.findByPk(id, { include: 'user' });
    } else {
      customer = await models.Customer.findByPk(id);
    }
    if (customer != null) {
      return customer;
    } else {
      throw boom.notFound(error.message);
    }
  }
  async patch(id, body) {
    try {
      const customer = await this.findOne(id);
      const patchingCustomer = await customer.update(body);
      return patchingCustomer;
    } catch (error) {
      throw boom.badData(error.message);
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
