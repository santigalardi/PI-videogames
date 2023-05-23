import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames, getVideogamesByName } from '../../redux/actions';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSearch = () => {
    if (!name) {
      dispatch(getVideogames());
    } else {
      dispatch(getVideogamesByName(name));
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input type='text' value={name} onChange={handleChange} onKeyDown={handleKeyDown} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
