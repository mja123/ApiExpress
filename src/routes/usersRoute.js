const express = require('express');
const faker = require('faker');
const responses = require('../helpers/responses')
const router = express.Router();
let users = [];
let idElement = 0;

router.post('/aleatory', (req, res) => {
  const { usersCount } = req.query;
  const limitOfUsers = usersCount || 10

  for (let i = 0; i < limitOfUsers; i++) {
    users.push({
      id: idElement,
      name: faker.name.firstName(),
    });
    idElement++;
  }
  res.status(201).send(`${limitOfUsers} created succesfully!`);
});

router.post('/', (req, res) => {
  const body = req.body;

  users.push({
    id: idElement,
    name: body.name
    });
    responses.succesful(users, idElement, 201, 'User created succesfully!', res)
    idElement++;
})

router.get('/', (req, res) => {
  res.json(users)
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  if(responses.findId(users, id, idElement)) {
    responses.succesful(users, idElement, 200, 'User found succesfully!', res);
  } else {
    responses.error(404, 'User not found', res);
  }
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  let body = req.body;

  if(responses.findId(users, id, idElement)) {
    users[id] = {
      id: id,
      name: body.name,
    };
    responses.succesful(users, idElement, 200, 'User patched succesfully!', res);
  } else {
    responses.error(404, 'User not found', res);
  }
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if(responses.findId(users, id, idElement)) {
    responses.succesful(users, idElement, 200, 'User deleted succesfully!', res);
  } else {
    responses.error(404, 'User not found', res);
  }
  users.splice(id, 1);
});

module.exports = router;

//TODO: Hacer que se vea la data cuando se realiza con éxito un request
