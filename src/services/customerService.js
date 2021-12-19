const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class customerService {

    async get() {
        try {
            const allCustomers = await models.Customer.findAll();
            return allCustomers;
        } catch(error) {
            return boom.badRequest(error.message);
        }
    }
}

module.exports = customerService;
