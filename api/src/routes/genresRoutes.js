const { Router } = require('express');
const { getGenres } = require('../handlers/genresHandler.js');
const router = Router();

router.get('/', getGenres);

module.exports = router;
