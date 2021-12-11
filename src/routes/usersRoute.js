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

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const getUsers = service.get(limit, offset);

  if (getUsers.length != 0) {
    res.json(getUsers);
  } else {
    responses.error(404, 'Users not found', res);
  }
});

router.get(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  (req, res, next) => {
    const { id } = req.params;
    const getUserById = service.findOne(id);

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
