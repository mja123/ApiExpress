const faker = require('faker');
const responses = require('./../helpers/responses').findId
class ProductService{

  constructor(){
    this.products = [];
    this.idElement = 0;
    this.generate();
  }

  generate() {

    const limitOfProducts = 100;
    for (let i = 0; i < limitOfProducts; i++) {
      this.products.push({
        id: this.idElement,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
      });
      this.idElement++;

    }
  }

  get(limit = this.products.length, offset = 0) {
    const auxiliary = [];

    if (limit == undefined && offset == undefined || limit != undefined && offset != undefined) {
      for (let i = offset; i < limit; i++) {
        auxiliary.push(this.products[i]);
      }
    }
    if (limit == undefined && offset != undefined) {
      for (let i = offset; i < this.products.length; i++) {
        auxiliary.push(this.products[i]);
      }
    }
    if (limit != undefined && offset == undefined) {
      for (let i = 0; i < limit; i++) {
        auxiliary.push(this.products[i]);
      }
    }

    return auxiliary;
  }
  findOne(id) {

    const product = this.products.find(element => element.id == id);
    return product;
  }

  post(body) {
    this.products.push({
      id: this.idElement,
      name: body.name,
      price: body.price,
    });
    this.idElement++;

    return this.products[this.idElement - 1];
  }

  patch(id, body) {

    if(responses(this.products, id, this.idElement)) {
      if (body.name) {
        this.products[id] = {
          //spread operator...
          id: id,
          name: body.name,
          price: this.products[id].price,
        }
      } if (body.price) {
        this.products[id] = {
          id: id,
          name: this.products[id].name,
          price: body.price,
        };
      }
      return this.products[id];
    } else {
      return -1;
    }
  }
  put(id, body) {

    if(responses(this.products, id, this.idElement)) {
      this.products[id] = {
        id: id,
        name: body.name,
        price: body.price,
      };
      return this.products[id];
    } else {
      return -1;
    }

  }

  delete(id) {

    if(responses(this.products, id, this.idElement)) {
      this.products.splice(id, 1);
      return 1
    } else {
      return -1
    }
  }
}

module.exports = ProductService;
