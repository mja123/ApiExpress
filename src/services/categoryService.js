const { models } = require('./../libs/sequelize');
const boom = require('@hapi/boom');

class CategoryService {
  async get(products) {
    try {
      let categories;
      if (Object.keys(products).length > 0) {
        categories = await models.Category.findAll({ include: 'products' });
      } else {
        categories = await models.Category.findAll();
      }
      return categories;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }
  async findOne(id, products) {
    try {
        let category;
        if (Object.keys(products).length > 0) {
          category = await models.Category.findOne({
            id: id,
            include: 'products'
          })
        } else {
          category = await models.Category.findByPk(id);
        }
        return category;
    } catch (error) {
      throw boom.notFound(error.message);
    }
  }
  async create(body) {
    try {
      const newCategory = await models.Category.create({
        name: body.name,
      });
      return newCategory;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
  async put(id, body) {
    try {
      const category = await this.findOne(id);
      const puttingCategory = await category.update({
        name: body.name,
      });
      return puttingCategory;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }
  async delete(id) {
    try {
      const category = await this.findOne(id);
      const delettingCategory = await category.destroy();
    } catch (error) {
      throw boom.badImplementation(error.message);
    }
  }
}

module.exports = CategoryService;
