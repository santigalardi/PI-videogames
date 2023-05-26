import styles from './Pagination.module.css';

const Pagination = ({ videogamesPerPage, allVideogames, currentPage, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      <button onClick={() => pagination(currentPage - 1)} disabled={currentPage === 1} className={styles.btn}>
        ⬅️
      </button>
      {pageNumbers.map((number) => (
        <button key={number} onClick={() => pagination(number)} disabled={currentPage === number} className={styles.btn}>
          {number}
        </button>
      ))}
      <button onClick={() => pagination(currentPage + 1)} disabled={currentPage === Math.ceil(allVideogames / videogamesPerPage)} className={styles.btn}>
        ➡️
      </button>
    </div>
  );
};

export default Pagination;
