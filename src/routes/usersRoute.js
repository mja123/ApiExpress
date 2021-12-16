const express = require('express');
const responses = require('../helpers/responses');

const router = express.Router();
const UserService = require('./../services/userService');
const validatorHandler = require('./../middlewares/validators');
const {
  createSchema,
  updateSchema,
  deleteSchema,
  findOneSchema,
} = require('./../validators/usersSchemaVlidator');

const service = new UserService();

router.post('/', validatorHandler(createSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.post(body);
    responses(newUser, 201, 'User created succesfully!', res);
  } catch(error) {
    next(error);
  }

});

router.get('/', async (req, res, next) => {
  try {
    const users = await service.get();
    responses(users, 200, 'User found!', res);
  } catch(error) {
    next(error);
  }
})


router.get(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const getUserById = await service.findOne(id);
      responses(getUserById, 200, 'User found!', res);
    } catch (error) {
      next(error);
    }
  }
);
router.patch(
  '/:id',
  validatorHandler(updateSchema, ['params', 'body']),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const putUser = await service.patch(id, body);
      responses(putUser, 200, 'User updated correctly!', res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const deleteUser = service.delete(id);
      responses(deleteUser, 200, 'User deleted correctly!', res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

//TODO: Hacer que se vea la data cuando se realiza con éxito un request
