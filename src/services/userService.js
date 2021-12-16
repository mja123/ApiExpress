const boom = require('@hapi/boom');
//models is created when we initialized the model, and the way to use it is with the modelName in the config of the User's Model
const { models } = require('./../libs/sequelize');

class UserService {
  async get() {
    try {
      const users = await models.User.findAll();
      return users;
    } catch (error) {
      throw boom.notImplemented(error.message);
    }
  }
  async findOne(id) {
    try {
      const user = await models.User.findOne({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      throw boom.notFound(error.message);
    }
  }

  async post(body) {
    try {
      const newUser = await models.User.create({
        email: body.email,
        password: body.password,
      });

      return newUser;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }

  async patch(id, body) {
    try {
      let attributeChange;
      if (body.password) {
        attributeChange = 'password';
      } else {
        attributeChange = 'email';
      }
      const modifingUser = await models.User.update(
        {
          attributeChange: attributeChange.body,
        },
        {
          where: {
            id: id,
          },
        }
      );
      return modifingUser;
    } catch (error) {
      throw boom.notFound(error.message);
    }
  }

  async delete(id) {
    try {
      const deletingUser = await models.User.destroy({
        where: {
          id: id,
        },
      });
      return deletingUser;
    } catch (error) {
      throw boom.notFound(error.message);
    }
  }
}

module.exports = UserService;
