const { getDBGenres, createGenres } = require('../controllers/genresController.js');

const getGenres = async (req, res) => {
  try {
    const genres = await getDBGenres();
    if (genres.length > 0) {
      return res.status(200).json(genres);
    } else {
      await createGenres();
      const dbGenres = await getDBGenres();
      return res.status(200).json(dbGenres);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { getGenres };
