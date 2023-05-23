const axios = require('axios');
const URL = 'https://api.rawg.io/api/genres';
const { API_KEY } = process.env;
const { Genre } = require('../db.js');

// Obtener todos los géneros de la base de datos
const getDBGenres = async () => await Genre.findAll();

const createGenres = async () => {
  const response = await axios.get(`${URL}?key=${API_KEY}`);
  const genresData = response.data.results;
  for (let i = 0; i < genresData.length; i++) {
    await Genre.create({ name: genresData[i].name });
  }
};

module.exports = { getDBGenres, createGenres };
