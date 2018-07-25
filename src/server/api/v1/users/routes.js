const express = require('express');
const { getUsers, getUser } = require('./controller');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
