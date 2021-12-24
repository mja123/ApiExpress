const express = require('express');
const CategoryService = require('./../services/categoryService');
const validatorHandler = require('./../middlewares/validators');
const {
  findOneCategory,
  createCategory,
} = require('./../validators/categorySchemaValidator');
const queryValidator = require('./../middlewares/queryParams');

const service = new CategoryService();

const router = express.Router();

router.get('/', queryValidator("products"),
 async (req, res, next) => {
  try {
    const products = req.query;

    const categories = await service.get(products);
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});
router.get('/:id',
queryValidator("products"),
validatorHandler(findOneCategory, 'params'),
 async (req, res, next) => {
    const products = req.query;
    const { id } = req.params;
    console.log(products);
    try {
      const category = await service.findOne(id, products);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  });
router.post(
  '/',
  validatorHandler(createCategory, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/:id',
  validatorHandler(findOneCategory, 'params'),
  validatorHandler(createCategory, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const putCategory = await service.put(id, body);
      res.status(200).json(putCategory);
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  '/:id',
  validatorHandler(findOneCategory, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json(id);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
