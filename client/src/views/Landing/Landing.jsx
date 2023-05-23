import { NavLink } from 'react-router-dom';
import icon from '../../assets/images/joystick.png';
import background from '../../assets/images/landscape-background.webp';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <img src={background} alt='background' />
      <div className={styles.logoContainer}>
        <NavLink to='/home' className={styles.logo}>
          <h1>GAME ATLAS</h1>
          <img src={icon} alt='Game Atlas' className={styles.icon} />
        </NavLink>
      </div>
    </div>
  );
};

export default Landing;
