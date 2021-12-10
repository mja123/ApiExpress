const faker = require('faker');
const responses = require('./../helpers/responses').findId;
const boom = require('@hapi/boom');

class ProductService {
  constructor() {
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
        isBlock: faker.datatype.boolean(),
      });
      this.idElement++;
    }
  }

  get(limit = this.products.length, offset = 0) {
    const auxiliary = [];

    if (
      (limit == undefined && offset == undefined) ||
      (limit != undefined && offset != undefined)
    ) {
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
    const product = this.products.find((element) => element.id == id);
    if (!product) {
      throw boom.notFound('Product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('This product is blocking');
    }
    return product;
  }

  post(body) {
    this.products.push({
      id: this.idElement,
      name: body.name,
      price: body.price,
      isBlock: faker.datatype.boolean()
    });
    this.idElement++;

    return this.products[this.idElement - 1];
  }

  patch(id, body) {
    if (responses(this.products, id, this.idElement)) {
      const product = this.products[id];
      if (product.isBlock) {
        throw boom.conflict("This product is blocking!");
      }
      if (body.price) {
        this.products[id] = {
          ...this.products[id],
          price: body.price
        };
      }
      if (body.name) {
        this.products[id] = {
          ...this.products[id],
          name: body.name
        };
      }
      return this.products[id];
    } else {
      throw boom.notFound('Product not found!');
    }
  }
  put(id, body) {
    if (responses(this.products, id, this.idElement)) {
      const product = this.products[id];
      if(product.isBlock) {
        throw boom.conflict("This product is blocking!");
      }
      this.products[id] = {
        ...this.products[id],
        name: body.name,
        price: body.price,
      };
      return this.products[id];
    } else {
      throw boom.notFound('Product not found!');
    }
  }

  delete(id) {
    if (responses(this.products, id, this.idElement)) {
      const product = this.products[id];
      if(product.isBlock) {
        throw boom.conflict("This product is blocking!")
      }
      this.products.splice(id, 1);
      return product;
    } else {
      throw boom.notFound('Product not found!');
    }
  }
}

module.exports = ProductService;
