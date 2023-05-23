import { useDispatch, useSelector } from 'react-redux';
import { getVideogame } from '../../redux/actions';
import { useEffect } from 'react';

const Detail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideogame(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const videogame = useSelector((state) => state.detail);

  return (
    <div>
      {videogame.length > 0 ? (
        <div key={videogame.id}>
          <h1>{videogame[0].name}</h1>
          <img src={videogame[0].image} alt={videogame[0].name} />
          <h3>{videogame[0].platforms.join(', ')} </h3>
          <h3>{videogame[0].genres.join(', ')} </h3>
          <h3>{videogame[0].released} </h3>
          <h3>{videogame[0].rating} </h3>
          <h3>{videogame[0].description} </h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Detail;
