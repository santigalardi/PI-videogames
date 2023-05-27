import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, postVideogame } from '../../redux/actions';
import crossClear from '../../assets/images/cruz.png';
import styles from './Form.module.css';

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const genres = useSelector((state) => state.genres);

  const [form, setForm] = useState({
    name: '',
    image: '',
    platforms: [],
    released: '',
    rating: 1,
    genres: [],
    description: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    image: '',
    platforms: '',
    released: '',
    rating: '',
    genres: '',
    description: '',
    form: '',
  });

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const validate = (form) => {
    setErrors((prevErrors) => {
      let newErrors = { ...prevErrors };

      if (form.name.length > 40) {
        newErrors.name = 'Max 40 characters';
      } else {
        newErrors.name = '';
      }

      if (form.image === '') {
        newErrors.image = '';
      } else if (/^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/[\w.-]*)*\/?$/.test(form.image)) {
        newErrors.image = '';
      } else {
        newErrors.image = 'Must be a valid URL';
      }

      if (form.platforms.length > 0) newErrors.platforms = '';

      // Comprobar si la fecha seleccionada es una fecha pasada
      const currentDate = new Date();
      const selectedDate = new Date(form.released);

      if (selectedDate > currentDate) {
        newErrors.released = 'Select a past date';
      } else {
        newErrors.released = '';
      }

      if (form.rating < 1 || form.rating > 5) {
        newErrors.rating = 'Rating must be between 1 and 5';
      } else {
        newErrors.rating = '';
      }

      if (form.genres.length > 0) newErrors.genres = '';

      if (form.description.length === 0) {
        newErrors.description = '';
      } else if (form.description.length < 15) {
        newErrors.description = 'Minimum 15 characters';
      } else {
        newErrors.description = '';
      }

      return newErrors;
    });
  };

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });
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
      if (!form.genres.includes(value)) {
        setForm({
          ...form,
          genres: [...form.genres, value],
        });
      }
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

        const newErrors = { ...errors };

        if (filteredVideogames.length > 0) {
          // El videojuego ya existe
          newErrors.name = 'Videogame already exists';
        }

        if (form.name === '') newErrors.name = "Please write your videogame's name";

        if (form.image === '') newErrors.image = "Please write your videogame's name";

        if (form.platforms.length === 0) newErrors.platforms = 'Please select a platform';

        if (form.released === '') newErrors.released = 'Please select a release date';

        if (form.rating === '') newErrors.rating = 'Please rate your game';

        if (form.genres.length === 0) newErrors.genres = 'Please select a genre';

        setErrors(newErrors);
        const hasNoErrors = Object.values(newErrors).every((value) => value === '');

        if (hasNoErrors) {
          // Continuar con el envío del formulario si no hay errores
          dispatch(postVideogame(form));
          alert('Videogame Created!');
          setForm({
            name: '',
            image: '',
            platforms: [],
            released: '',
            rating: 1,
            genres: [],
            description: '',
          });
          history.push('/home');
        }
      })
      .catch((error) => {
        console.log(error);
        setErrors({ ...errors, form: 'Hubo un error al crear el videojuego. Por favor, intenta nuevamente.' });
      });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Create your videogame!</h2>
        <div>
          <label>Name: </label>
          <input type='text' value={form.name} onChange={changeHandler} name='name' />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <label>Image: </label>
          <input type='text' value={form.image} onChange={changeHandler} name='image' />
          {errors.image && <span>{errors.image}</span>}
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
            <div className={styles.selectedContainer}>
              <ul>
                <li>{form.platforms.map((platform) => platform + ', ')}</li>
              </ul>
              <button onClick={() => clearSelection('platforms')} className={styles.clearButton}>
                <img src={crossClear} alt='delete' />
              </button>
            </div>
          )}
          {errors.platforms && <span>{errors.platforms}</span>}
        </div>

        <div>
          <label>Released: </label>
          <input type='date' value={form.released} onChange={changeHandler} name='released' />
          {errors.released && <span>{errors.released}</span>}
        </div>

        <div>
          <label>Rating: </label>
          <input type='number' value={form.rating} onChange={changeHandler} name='rating' />
          {errors.rating && <span>{errors.rating}</span>}
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
            <div className={styles.selectedContainer}>
              <ul>
                <li>{form.genres.map((genre) => genre + ', ')}</li>
              </ul>
              <button onClick={() => clearSelection('genres')} className={styles.clearButton}>
                <img src={crossClear} alt='delete' />
              </button>
            </div>
          )}
          {errors.genres && <span>{errors.genres}</span>}
        </div>

        <div>
          <label>Description: </label>
          <textarea type='text' value={form.description} onChange={changeHandler} name='description' />
          {errors.description && <span>{errors.description}</span>}
        </div>

        <button type='submit' className={styles.submit}>
          Create
        </button>
        {errors.form && <span>{errors.form}</span>}
      </form>
    </div>
  );
};

export default Form;
