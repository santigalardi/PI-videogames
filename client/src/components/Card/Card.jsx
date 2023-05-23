import styles from './Card.module.css';

const Card = (props) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imgContainer}>
        <img src={props.image} alt={props.name} />
      </div>
      <div className={styles.propsContainer}>
        <h3>{props.name}</h3>
        <p>{props.genres}</p>
        <p>Rating: {props.rating}</p>
      </div>
    </div>
  );
};

export default Card;
