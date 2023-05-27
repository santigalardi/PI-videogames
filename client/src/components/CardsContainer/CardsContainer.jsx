import Pagination from '../../components/Pagination/Pagination';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVideogames, filterVideogamesByGenre, filterVideogamesBySource, sortVideogamesAlphabetically, sortVideogamesByRating, getGenres } from '../../redux/actions';
import Card from '../Card/Card';
import styles from './CardsContainer.module.css';

const CardsContainer = () => {
  const dispatch = useDispatch();

  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const videogamesPerPage = 15;
  const indexOfLastVideogame = currentPage * videogamesPerPage; //15
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame);

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
  }, [dispatch]);

  const handleGenresFilter = (event) => {
    dispatch(filterVideogamesByGenre(event.target.value));
    setCurrentPage(1);
  };

  const handleCreatedFilter = (event) => {
    dispatch(filterVideogamesBySource(event.target.value));
    setCurrentPage(1);
  };

  const handleSortAlphabetically = (event) => {
    dispatch(sortVideogamesAlphabetically(event.target.value));
    setCurrentPage(1);
  };

  const handleSortByRating = (event) => {
    dispatch(sortVideogamesByRating(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <label>Filter By Genre:</label>
          <select onChange={(event) => handleGenresFilter(event)} name='genres'>
            <option value='All'>All</option>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filter}>
          <label>Filter By Source:</label>
          <select onChange={(event) => handleCreatedFilter(event)}>
            <option value='All'>All</option>
            <option value='API'>API</option>
            <option value='created'>Created</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label>Sort Alphabetically:</label>
          <select onChange={(event) => handleSortAlphabetically(event)}>
            <option value='Random'>Random</option>
            <option value='A'>A-Z</option>
            <option value='Z'>Z-A</option>
          </select>
        </div>

        <div className={styles.filter}>
          <label>Sort By Rating:</label>
          <select onChange={(event) => handleSortByRating(event)}>
            <option value='Random'>Random</option>
            <option value='max'>High to Low</option>
            <option value='min'>Low to High</option>
          </select>
        </div>
      </div>
      <Pagination videogamesPerPage={videogamesPerPage} allVideogames={allVideogames.length} currentPage={currentPage} pagination={pagination} />

      <div className={styles.cardsContainer}>
        {currentVideogames.map((videogame) => (
          <NavLink to={`/detail/${videogame.id}`} key={videogame.id} className={styles.link}>
            <Card name={videogame.name} image={videogame.image} genres={videogame.genres.join(', ')} platforms={videogame.platforms.join(', ')} rating={videogame.rating} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;
