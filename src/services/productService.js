const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ProductService {
  async get() {
    try {
      const products = await models.Product.findAll();
      return products;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }

  async findOne(id) {
    try {
      const product = await models.Product.findOne({
        where: {
          id: id,
        },
      });
      return product;
    } catch(error) {
      throw boom.notFound(error.message);
    }
  }

  async post(body) {
    try {
      const newProduct = await models.Product.create({
        name: body.name,
        price: body.price,
      });
      return newProduct;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
/*
  patch(id, body) {
    if (responses(this.products, id, this.idElement)) {
      const product = this.products[id];
      if (product.isBlock) {
        throw boom.conflict('This product is blocking!');
      }
      if (body.price) {
        this.products[id] = {
          ...this.products[id],
          price: body.price,
        };
      }
      if (body.name) {
        this.products[id] = {
          ...this.products[id],
          name: body.name,
        };
      }
      return this.products[id];
    } else {
      throw boom.notFound('Product not found!');
    }
  }
  put(id, body) {
    if (responses(this.products, id, this.idElement)) {
      const product = this.products[id];
      if (product.isBlock) {
        throw boom.conflict('This product is blocking!');
      }
      this.products[id] = {
        ...this.products[id],
        name: body.name,
        price: body.price,
      };
      return this.products[id];
    } else {
      throw boom.notFound('Product not found!');
    }
  }
*/
  async delete(id) {
    try {
      const deletingProduct = await models.Product.destroy({
        where: {
          id: id,
        },
      });
      return deletingProduct;
    } catch(error) {
      throw boom.notFound(error.message);
    }
  }
}

module.exports = ProductService;
