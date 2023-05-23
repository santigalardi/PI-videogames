const { Router } = require('express');
const { getVideogamesHandler, getVideogameHandler, createVideogameHandler } = require('../handlers/videogamesHandler.js');
const router = Router();

const validate = (req, res, next) => {
  const { name, platforms, rating } = req.body;
  if (!name) res.status(400).json({ error: 'Missing name' });
  if (!platforms) res.status(400).json({ error: 'Missing platforms' });
  if (!rating) res.status(400).json({ error: 'Missing rating' });

  next();
};

router.get('/', getVideogamesHandler);
router.get('/:id', getVideogameHandler);
router.post('/', validate, createVideogameHandler);

module.exports = router;
