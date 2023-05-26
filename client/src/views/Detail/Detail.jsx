import { useDispatch, useSelector } from 'react-redux';
import { getVideogame } from '../../redux/actions';
import { useEffect } from 'react';

import styles from './Detail.module.css';

const Detail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogame(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const videogame = useSelector((state) => state.detail);

  return (
    <div>
      {videogame && videogame.length > 0 ? (
        <div>
          <div key={videogame.id} className={styles.detailContainer}>
            <div className={styles.imgContainer}>
              <img src={videogame[0].image} alt={videogame[0].name} />
            </div>
            <div className={styles.detailsContainer}>
              <div className={styles.titleContainer}>
                <h1>{videogame[0].name}</h1>
              </div>
              <div className={styles.details}>
                <div>
                  <h3>Platforms: </h3>
                  <p>{videogame[0].platforms.join(', ')}</p>
                </div>
                <div>
                  <h3>Genres: </h3>
                  <p>{videogame[0].genres.join(', ')}</p>
                </div>
                <div>
                  <h3>Released: </h3>
                  <p>{videogame[0].released}</p>
                </div>
                <div>
                  <h3>Rating: </h3>
                  <p>{videogame[0].released}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <p dangerouslySetInnerHTML={{ __html: videogame[0].description }}></p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
