const faker = require('faker');
const responses = require('./../helpers/responses').findId
const boom = require('@hapi/boom');
const dbConnection = require('./../libs/postgres');

class UserService{

  constructor(){
    this.users = [];
    this.idElement = 0;
    this.generate();
  }

  generate() {

    const limitOfUsers = 100;
    for (let i = 0; i < limitOfUsers; i++) {
      this.users.push({
        id: this.idElement,
        name: faker.name.firstName(),
        isBlock: faker.datatype.boolean()
      });
      this.idElement++;

    }
  }

  async get() {

    try {
      const client = await dbConnection();

      const users = await client.query('SELECT * FROM users');
      console.log("SERVICE, TRY")
      return users.rows;
    } catch(error) {
      console.log("SERVICE, CATCH")
      throw boom.notImplemented('Failed database connection :(')
    }
  }
  findOne(id) {
    //trying the middleware erro
    //asdfasdf;

    const user = this.users.find(element => element.id == id);
    if(!user) {
      throw boom.notFound("User not found!");
    }
    if(user.isBlock) {
      throw boom.conflict("This user is blocking!");
    }
    return user;
  }

  post(body) {
    this.users.push({
      id: this.idElement,
      name: body.name,
      isBlock: faker.datatype.boolean(),
    });
    this.idElement++;

    return this.users[this.idElement - 1];
  }

  put(id, body) {

    if(responses(this.users, id, this.idElement)) {
      const user = this.users[id];

      if(user.isBlock) {
        throw boom.conflict("This user is blocking!");
      }
      this.users[id] = {
        ...user,
        name: body.name,
      };
      return this.user;
    } else {
      throw boom.notFound("User not found!");
    }

  }

  delete(id) {

    if(responses(this.users, id, this.idElement)) {
      const user = this.users[id];

      if(user.isBlock) {
        throw boom.conflict("This user is blocking!");
      }
      this.users.splice(id, 1);
      return user;
    } else {
      throw boom.notFound("User not found!");
    }
  }
}

module.exports = UserService;
