const express = require('express');

const router = express.Router();
const UserService = require('./../services/userService');
const validatorHandler = require('./../middlewares/validators');
const {
  createSchema, putSchema, patchSchema, deleteSchema, findOneSchema
} = require('./../validators/usersSchemaVlidator');

const service = new UserService();

router.post('/', validatorHandler(createSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body;
    const newUser = await service.post(body);
    res.status(201).json(newUser);
  } catch(error) {
    next(error);
  }

});

router.get('/', async (req, res, next) => {
  try {
    const users = await service.get();
    res.status(200).json(users);
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
      res.status(200).json(getUserById);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', validatorHandler(findOneSchema, 'params'),
  validatorHandler(putSchema, 'body'),
  async(req, res, next) => {
  const userId = req.params.id;
  const newData = req.body;
  console.log(userId)
  try {
    const userChanged = await service.put(userId, newData);
    res.status(200).json(userChanged);
  } catch(error) {
    next(error);
  }
})

router.patch(
  '/:id',
  validatorHandler(findOneSchema, 'params'),
  validatorHandler(patchSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const patchUser = await service.patch(id, body);
      res.status(200).json(patchUser);
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
      res.status(200).json(deleteUser);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

