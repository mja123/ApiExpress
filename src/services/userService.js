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
    const user = await models.User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw boom.notFound(error.message);
  }

  async post(body) {
    try {
      const newUser = await models.User.create({
        email: body.email,
        password: body.password,
        role: body.role,
      });

      return newUser;
    } catch (error) {
      throw boom.badData(error.message);
    }
  }

  async put(id, body) {
    try {
      console.log('id ' + id);
      const user = await this.findOne(id);
      const changingUser = await user.update({
        email: body.email,
        password: body.password,
        role: body.role || 'client',
      });
      return changingUser;
    } catch (error) {
      throw boom.badRequest(error.message);
    }
  }

  async patch(id, body) {
    try {
      const user = await this.findOne(id);

      const patchedUser = await user.update(body);
      return patchedUser;
    } catch (error) {
      throw boom.notFound(error.message);
    }
  }

  async delete(id) {
    try {
      await this.findOne(id);
      await models.User.destroy({
        where: {
          id: id,
        },
      });
      return id;
    } catch (error) {
      throw boom.notFound(error.message);
    }
  }
}

module.exports = UserService;
