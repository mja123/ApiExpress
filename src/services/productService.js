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
    const product = await models.Product.findOne(id);
    if(product) {
      return product;
    }
    throw boom.notFound('Product not found');
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

  async patch(id, body) {
    try{
      const product = await this.findOne(id);
      let attributeToChange;
      if(body.name) {
        attributeToChange = 'name';
      } else {
        attributeToChange = 'price'
      }
      const patchingProduct = await product.update({
        attributeToChange: attributeToChange.body
      })
      return patchingProduct
    } catch(error) {
      throw boom.notFound('Product not found!');
    }

  }
  async put(id, body) {

    try{
      const product = await this.findOne(id);
      const puttingProduct = await product.update(body)
      return puttingProduct
    } catch(error) {
      throw boom.notFound('Product not found!');
    }

  }

  async delete(id) {
    try {
      const deletingProduct = await this.findOne(id);
      await deletingProduct.destroy();
      return id;
    } catch(error) {
      throw boom.notFound(error.message);
    }
  }
}

module.exports = ProductService;
