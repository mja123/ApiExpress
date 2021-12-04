const express = require('express');
const faker = require('faker');

const router = express.Router();
const users = [];
let id = 0;

router.post('/aleatory', (req, res) => {
  const { usersCount } = req.query;

  const limitOfUsers = usersCount || 10

  for (let i = 0; i < limitOfUsers; i++) {
    users.push({
      id: id,
      name: faker.name.firstName(),
    });
    id++;
  }
  res.send(`${limitOfUsers} created succesfully!`);
});


router.post('/', (req, res) => {
  const body = req.body;

  users.push({
    id: id,
    name: body.name
    });

  res.json({
    message: "Product created succesfully!",
    id: id,
    data: body
  });
  id++;
})

router.get('/', (req, res) => {
  res.json(users)
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  res.json(users[id]);
})

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  let body = req.body;

  users[id] = {
    id: id,
    name: body.name,
  };
  res.json({
    message: 'User pached correctly!',
    data: users[id]
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'User deleted succesfully!',
    data: users[id],
  });
  users.splice(id, 1);
});

module.exports = router;