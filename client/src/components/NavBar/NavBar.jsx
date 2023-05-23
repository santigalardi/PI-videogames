import { NavLink, useLocation } from 'react-router-dom';
import icon from '../../assets/images/joystick.png';

import SearchBar from '../SearchBar/SearchBar';

import styles from './NavBar.module.css';

const NavBar = () => {
  const location = useLocation();

  return (
    <div className={styles.navbar}>
      <div className={styles.logoContainer}>
        <NavLink to='/home' className={styles.logo}>
          <h1>GAME ATLAS</h1>
          <img src={icon} alt='Game Atlas' className={styles.icon} />
        </NavLink>
      </div>
      {location.pathname !== '/create' && (
        <NavLink to='/create' className={styles.create}>
          CREATE VIDEOGAME!
        </NavLink>
      )}
      {location.pathname !== '/create' && !location.pathname.includes('/detail/') && <SearchBar />}
    </div>
  );
};

export default NavBar;
