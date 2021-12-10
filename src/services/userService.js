const faker = require('faker');
const responses = require('./../helpers/responses').findId
const boom = require('@hapi/boom');

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

  get(limit = this.users.length, offset = 0) {
    const auxiliary = [];

    if (limit == undefined && offset == undefined || limit != undefined && offset != undefined) {
      for (let i = offset; i < limit; i++) {
        auxiliary.push(this.users[i]);
      }
    }
    if (limit == undefined && offset != undefined) {
      for (let i = offset; i < this.users.length; i++) {
        auxiliary.push(this.users[i]);
      }
    }
    if (limit != undefined && offset == undefined) {
      for (let i = 0; i < limit; i++) {
        auxiliary.push(this.users[i]);
      }
    }

    return auxiliary;
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
