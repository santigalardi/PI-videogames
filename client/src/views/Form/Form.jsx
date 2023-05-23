import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame } from '../../redux/actions';

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);

  const [form, setForm] = useState({
    name: '',
    image: '',
    platforms: [],
    released: '',
    rating: 0.0,
    genres: [],
    description: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    platforms: '',
    image: '',
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const validate = (form) => {
    if (/^[a-zA-Z0-9\s]{1,50}$/.test(form.name)) {
      setErrors({ ...errors, name: '' });
    } else {
      setErrors({ ...errors, name: 'Hay un error en name' });
    }
    if (form.name === '') setErrors({ ...errors, name: '' });
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });

    console.log(form);
  };

  const handleSelect = (event) => {
    const { name, value } = event.target;

    if (name === 'platforms') {
      if (!form.platforms.includes(value)) {
        setForm({
          ...form,
          platforms: [...form.platforms, value],
        });
      }
    } else if (name === 'genres') {
      setForm({
        ...form,
        genres: [...form.genres, value],
      });
    }
  };

  const clearSelection = (property) => {
    setForm({
      ...form,
      [property]: [],
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get(`http://localhost:3001/videogames`)
      .then((response) => {
        const allVideogames = response.data;

        const filteredVideogames = allVideogames.filter((videogame) => videogame.name.toLowerCase() === form.name.toLowerCase());

        if (filteredVideogames.length > 0) {
          // El videojuego ya existe
          setErrors({ ...errors, name: 'Videogame already exists.' });
        } else {
          // Continuar con el envío del formulario si no hay errores
          console.log(form);
          dispatch(postVideogame(form));
          alert('Videogame Created!');
          setForm({
            name: '',
            background_image: '',
            platforms: [],
            released: null,
            rating: 0.0,
            genres: [],
            description: '',
          });
          history.push('/home');
        }
      })
      .catch((error) => {
        console.log(error);
        // Manejar el error de la solicitud
        setErrors({ ...errors, name: 'Hubo un error al verificar el nombre del videojuego. Por favor, intenta nuevamente.' });
      });
  };

  return (
    <div>
      <h2>Create your videogame!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input type='text' value={form.name} onChange={changeHandler} name='name' />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <label>Image: </label>
          <input type='text' value={form.image} onChange={changeHandler} name='image' />
        </div>

        <div>
          <label>Platforms: </label>
          <select value={form.platforms[0] || ''} onChange={handleSelect} name='platforms'>
            <option value='PC'>PC</option>
            <option value='Playstation 4'>Playstation 4</option>
            <option value='Playstation 5'>Playstation 5</option>
            <option value='Xbox 360'>Xbox 360</option>
            <option value='Xbox One'>Xbox One</option>
            <option value='Xbox Series S/X'>Xbox Series S/X</option>
          </select>
          {form.platforms.length > 0 && (
            <div>
              <ul>
                <li>{form.platforms.map((platform) => platform + ', ')}</li>
              </ul>
              <button onClick={() => clearSelection('platforms')}>Clear</button>
            </div>
          )}
        </div>

        <div>
          <label>Released: </label>
          <input type='date' value={form.released} onChange={changeHandler} name='released' />
        </div>

        <div>
          <label>Rating: </label>
          <input type='number' value={form.rating} onChange={changeHandler} name='rating' />
        </div>

        <div>
          <label>Genres: </label>
          <select onChange={handleSelect} name='genres'>
            {genres.map((genre, index) => (
              <option key={index} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {form.genres.length > 0 && (
            <ul>
              <li>{form.genres.map((genre) => genre + ', ')}</li>
              <button onClick={() => clearSelection('genres')}>Clear</button>
            </ul>
          )}
        </div>

        <div>
          <label>Description: </label>
          <textarea type='text' value={form.description} onChange={changeHandler} name='description' />
        </div>

        <button type='submit'>Create</button>
      </form>
    </div>
  );
};

export default Form;
