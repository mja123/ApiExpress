const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
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
      const hashPassword = await bcrypt.hash(body.password, 8);
      const newUser = await models.User.create({
        ...body,
        password: hashPassword,
      });
  
      //bodyValues added is to the internal manner sequelize works (when console.log(newUser) there is a subobject call dataValues)
      delete newUser.dataValues.password;
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
