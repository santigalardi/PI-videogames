require('dotenv').config();
const URL = 'https://api.rawg.io/api/games';
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db.js');

const cleanArray = (videogames) =>
  videogames.map((videogame) => {
    return {
      id: videogame.id,
      name: videogame.name,
      description: videogame.description,
      image: videogame.background_image,
      genres: videogame.genres.map((genre) => genre.name),
      platforms: videogame.platforms ? videogame.platforms.map((platform) => platform.platform.name) : '',
      released: videogame.released,
      rating: videogame.rating,
      created: false,
    };
  });

const getAllVideogames = async () => {
  // db Videogames
  const databaseVideogames = await Videogame.findAll();

  const apiVideogames = [];
  let nextPage = `${URL}?key=${API_KEY}`;

  // Realizar las solicitudes para obtener los primeros 100 juegos (5 páginas)
  for (let i = 0; i < 5; i++) {
    const apiResponse = await axios.get(nextPage);
    const apiVideogamesRaw = apiResponse.data.results;
    const cleanedVideogames = cleanArray(apiVideogamesRaw);
    apiVideogames.push(...cleanedVideogames);
    nextPage = apiResponse.data.next;
  }
  // Unificar

  return [...apiVideogames, ...databaseVideogames];
};
const getVideogameById = async (id, source) => {
  const videogameRaw = source === 'API' ? (await axios(`${URL}/${id}?key=${API_KEY}`)).data : await Videogame.findByPk(id);
  const videogame = cleanArray([videogameRaw]);
  return [...videogame];
};

const createVideogame = async (name, image, description, platforms, released, rating, genres) => await Videogame.create({ name, image, description, platforms, released, rating, genres });

const searchVideogameByName = async (name) => {
  if (!name) {
    return [];
  }
  const lowerCaseSearch = name.toLowerCase();

  const dbVideogames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${lowerCaseSearch}%`,
      },
    },
  });

  const apiVideogamesRaw = await axios.get(URL, {
    params: {
      key: API_KEY,
      search: name,
    },
  });

  const apiVideogames = cleanArray(apiVideogamesRaw.data.results);

  return [...dbVideogames, ...apiVideogames];
};

const getVideogameByName = async (name) => {
  const allVideogames = await getAllVideogames();

  const filteredVideogames = allVideogames.filter((videogame) => videogame.name.toLowerCase() === name.toLowerCase());

  return filteredVideogames.length > 0 ? filteredVideogames : null;
};

module.exports = { createVideogame, getVideogameById, getAllVideogames, searchVideogameByName, getVideogameByName };
