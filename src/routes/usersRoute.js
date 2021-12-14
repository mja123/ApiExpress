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

router.post('/', validatorHandler(createSchema, 'body'), (req, res) => {
  const body = req.body;
  const newUser = service.post(body);
  responses.succesful(newUser, 201, 'User created succesfully!', res);
});

router.get('/', async (req, res, next) => {
  try {
    const users = await service.get();
    console.log("ROUTE, TRY")
    responses.succesful(users, 200, 'User found!', res);
  } catch(error) {
    console.log("ROUTE, CATCH")
    next(error);
  }
})


router.get(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    const getUserById = await service.findOne(id);

    try {
      responses.succesful(getUserById, 200, 'User found!', res);
    } catch (error) {
      next(error);
    }
  }
);
router.put(
  '/:id',
  validatorHandler(updateSchema, ['params', 'body']),
  (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    const putUser = service.put(id, body);

    try {
      putUser;
      responses.succesful(putUser, 200, 'User updated correctly!', res);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorHandler(deleteSchema, 'params'),
  (req, res, next) => {
    const { id } = req.params;

    const deleteUser = service.delete(id);

    try {
      deleteUser;
      responses.succesful(deleteUser, 200, 'User deleted correctly!', res);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

//TODO: Hacer que se vea la data cuando se realiza con éxito un request
