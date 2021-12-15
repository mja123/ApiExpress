const faker = require('faker');
const responses = require('./../helpers/responses').findId;
const boom = require('@hapi/boom');
//models is created when we initialized the model, and the way to use it is with the modelName in the config of the User's Model
const { models /*, startingConnection*/ } = require('./../libs/sequelize');

class UserService {
  constructor() {
    this.users = [];
    this.idElement = 0;
    this.generate();
    //startingConnection();
  }

  generate() {
    const limitOfUsers = 100;
    for (let i = 0; i < limitOfUsers; i++) {
      this.users.push({
        id: this.idElement,
        name: faker.name.firstName(),
        isBlock: faker.datatype.boolean(),
      });
      this.idElement++;
    }
  }

  async get() {
    try {
      const users = await models.User.findAll();
      return users;
    } catch (error) {
      throw boom.notImplemented(error.message);
    }
  }
  findOne(id) {
    //trying the middleware erro
    //asdfasdf;

    const user = this.users.find((element) => element.id == id);
    if (!user) {
      throw boom.notFound('User not found!');
    }
    if (user.isBlock) {
      throw boom.conflict('This user is blocking!');
    }
    return user;
  }

  async post(body) {
    const newUser = await models.User.create({
      email: body.email,
      password: body.password,
    });

    return newUser;
  }

  put(id, body) {
    if (responses(this.users, id, this.idElement)) {
      const user = this.users[id];

      if (user.isBlock) {
        throw boom.conflict('This user is blocking!');
      }
      this.users[id] = {
        ...user,
        name: body.name,
      };
      return this.user;
    } else {
      throw boom.notFound('User not found!');
    }
  }

  delete(id) {
    if (responses(this.users, id, this.idElement)) {
      const user = this.users[id];

      if (user.isBlock) {
        throw boom.conflict('This user is blocking!');
      }
      this.users.splice(id, 1);
      return user;
    } else {
      throw boom.notFound('User not found!');
    }
  }
}

module.exports = UserService;
