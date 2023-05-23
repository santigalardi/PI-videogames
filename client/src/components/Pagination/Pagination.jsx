import styles from './Pagination.module.css';

const Pagination = ({ videogamesPerPage, allVideogames, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => pagination(number)} className={styles.btn}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
