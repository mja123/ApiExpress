const faker = require('faker');
const responses = require('./../helpers/responses').findId

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

    const user = this.users.find(element => element.id == id);
    return user;
  }

  post(body) {
    this.users.push({
      id: this.idElement,
      name: body.name,
    });
    this.idElement++;

    return this.users[this.idElement - 1];
  }

  put(id, body) {

    if(responses(this.users, id, this.idElement)) {
      this.users[id] = {
        id: id,
        name: body.name,
      };
      return this.users[id];
    } else {
      return -1;
    }

  }

  delete(id) {

    if(responses(this.users, id, this.idElement)) {
      this.users.splice(id, 1);
      return 1
    } else {
      return -1
    }
  }
}

module.exports = UserService;
