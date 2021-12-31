const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('./../libs/sequelize');

class ProductService {
  async get(query) {
    try {
      const { limit, offset, price_min, price_max, price, category } = query;
      const options = {
        where: {},
      }
      if (limit && offset) {
        options.limit = limit;
        options.offset = offset;
      }

      if (category == "true") {
          options.include = 'category';
      }
      if (price) {
        options.where.price = price;
      }
      if (price_min) {
        options.where.price = {
          [Op.gte]: price_min,
        }
      }
      if (price_max) {
        options.where.price = {
          [Op.lte]: price_max,
        }
      }
      const products = await models.Product.findAll(options);
      return products;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if(product != null) {
      return product;
    }
    throw boom.notFound('Product not found');
  }


  async post(body) {
    try {
      const newProduct = await models.Product.create({
        name: body.name,
        price: body.price,
        categoryId: body.categoryId,
      });
      return newProduct;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }

  async patch(id, body) {
    try{
      const product = await this.findOne(id);
      const patchingProduct = await product.update(body)
      return patchingProduct
    } catch(error) {
      throw boom.badData(error.message)
    }

  }
  async put(id, body) {

    try{
      const product = await this.findOne(id);
      const puttingProduct = await product.update({
        name: body.name,
        price: body.price,
        categoryId: body.categoryId,
      })
      return puttingProduct
    } catch(error) {
      throw boom.badData(error.message);
    }

  }

  async delete(id) {
    try {
      const deletingProduct = await this.findOne(id);
      await deletingProduct.destroy();
      return id;
    } catch(error) {
      throw boom.badImplementation(error.message);
    }
  }
}

module.exports = ProductService;
