const express = require('express');
const router = express.Router();

const { getUsers, getUserById, createUser, login, updateUser } = require('../controllers/userController');

router.get('/get-users', getUsers);

router.get('/get-user/:id', getUserById);

router.post('/sign-up', createUser);

router.post('/sign-in', login);

router.put('/update-user/:id', updateUser);

module.exports = router;