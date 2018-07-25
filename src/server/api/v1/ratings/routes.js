const express = require('express');
const { getContent, addRating, findRatingByContentAndUser } = require('./controller');

const router = express.Router();

router.get('/', findRatingByContentAndUser);
router.get('/:id', getContent);
router.post('/', addRating);



module.exports = router;
