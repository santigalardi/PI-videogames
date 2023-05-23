import { GET_VIDEOGAMES, GET_VIDEOGAME, GET_VIDEOGAMES_BY_NAME, FILTER_BY_GENRE, FILTER_BY_SOURCE, SORT_ALPHABETICALLY, SORT_BY_RATING } from './actions';

const initialState = {
  videogames: [],
  allVideogames: [],
  filteredVideogames: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return { ...state, videogames: action.payload, allVideogames: action.payload };

    case GET_VIDEOGAME:
      return { ...state, videogames: action.payload };

    case GET_VIDEOGAMES_BY_NAME:
      return { ...state, videogames: action.payload };

    case FILTER_BY_GENRE:
      const allVideogames = state.allVideogames;
      const filteredVideogames = action.payload === 'All' ? allVideogames : allVideogames.filter((videogame) => videogame.genres?.split(', ').includes(action.payload));
      return { ...state, videogames: filteredVideogames, filteredVideogames: filteredVideogames };

    case FILTER_BY_SOURCE:
      const genreFilter = state.filteredVideogames.length > 0 ? state.filteredVideogames : state.allVideogames;
      const sourceFilter = action.payload === 'created' ? genreFilter.filter((videogame) => videogame.created) : genreFilter.filter((videogame) => !videogame.created);
      return { ...state, videogames: action.payload === 'All' ? state.filteredVideogames : sourceFilter };

    case SORT_ALPHABETICALLY:
      let sortedAlphabetically;
      if (action.payload === 'A') {
        sortedAlphabetically = state.filteredVideogames.slice().sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else {
        sortedAlphabetically = state.filteredVideogames.slice().sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      }
      return { ...state, videogames: action.payload === 'Random' ? state.filteredVideogames : sortedAlphabetically };

    case SORT_BY_RATING:
      const sortedByRating = action.payload === 'max' ? state.allVideogames.sort((a, b) => b.rating - a.rating) : state.allVideogames.sort((a, b) => a.rating - b.rating);
      return { ...state, videogames: action.payload === 'Random' ? state.allVideogames : sortedByRating };

    default:
      return state;
  }
};

export default rootReducer;
