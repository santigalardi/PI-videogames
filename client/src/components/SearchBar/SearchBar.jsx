import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideogames, getVideogamesByName } from '../../redux/actions';
import icon from '../../assets/images/joystick.png';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.searchBar}>
      <input type='text' value={name} placeholder={isFocused ? '' : 'Search'} onChange={handleChange} onKeyDown={handleKeyDown} onFocus={handleFocus} onBlur={handleBlur} />
      <button onClick={handleSearch}>
        <img src={icon} alt='search-icon' />
      </button>
    </div>
  );
};

export default SearchBar;
