const express = require('express');
const responses = require('../helpers/responses')

const router = express.Router();
const UserService = require('./../services/userService')
const service = new UserService();


router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.post(body);
  responses.succesful(newUser, 201, 'User created succesfully!', res);

})

router.get('/', (req, res) => {
  const { limit, offset } = req.query;

  const getUsers = service.get(limit, offset)

  if(getUsers.length != 0) {
    res.json(getUsers);
  } else {
    responses.error(404, 'Users not found', res);
  }

});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const getUserById = service.findOne(id);

  if(getUserById != undefined) {
     responses.succesful(getUserById, 200, 'User found!', res);
  } else {
    responses.error(404, 'User not found', res);
  }
});
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const putUser = service.put(id, body);

  if(putUser != -1) {
    responses.succesful(putUser, 200, 'User updated correctly!', res)
  } else {
    responses.error(404, 'User not found', res);
  }
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const deleteUser = service.delete(id);

  if(deleteUser != -1) {
    responses.succesful(deleteUser, 200, 'User deleted correctly!', res)
  } else {
    responses.error(404, 'User not found', res);
  }

});

module.exports = router;

//TODO: Hacer que se vea la data cuando se realiza con éxito un request
