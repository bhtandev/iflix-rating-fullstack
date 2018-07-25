const express = require('express');
const { getContents, getContent } = require('./controller');

const router = express.Router();

router.get('/', getContents);
router.get('/:id', getContent);

module.exports = router;
