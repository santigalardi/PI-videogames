import axios from 'axios';
const URL = 'http://localhost:3001/videogames';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES';
export const GET_VIDEOGAME = 'GET_VIDEOGAME';
export const GET_VIDEOGAMES_BY_NAME = 'GET_VIDEOGAMES_BY_NAME';
export const GET_GENRES = 'GET_GENRES';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';
export const SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY';
export const SORT_BY_RATING = 'SORT_BY_RATING';

export const getVideogames = () => {
  return async function (dispatch) {
    const videogames = (await axios.get(URL)).data;
    dispatch({ type: GET_VIDEOGAMES, payload: videogames });
  };
};

export const getVideogame = (id) => {
  return async function (dispatch) {
    try {
      const videogame = (await axios.get(`${URL}/${id}`)).data;
      dispatch({ type: GET_VIDEOGAME, payload: videogame });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getVideogamesByName = (name) => {
  return async function (dispatch) {
    const videogame = (await axios.get(`${URL}?name=${name}`)).data;
    dispatch({ type: GET_VIDEOGAMES_BY_NAME, payload: videogame });
  };
};

export const getGenres = () => {
  return async function (dispatch) {
    const genres = (await axios.get('http://localhost:3001/genres')).data;
    dispatch({ type: GET_GENRES, payload: genres });
  };
};

export const postVideogame = (payload) => {
  return async function () {
    const videogame = await axios.post(URL, payload);
    return videogame;
  };
};

export const filterVideogamesByGenre = (payload) => {
  return { type: FILTER_BY_GENRE, payload };
};

export const filterVideogamesBySource = (payload) => {
  return { type: FILTER_BY_SOURCE, payload };
};

export const sortVideogamesAlphabetically = (payload) => {
  return { type: SORT_ALPHABETICALLY, payload };
};

export const sortVideogamesByRating = (payload) => {
  return { type: SORT_BY_RATING, payload };
};
