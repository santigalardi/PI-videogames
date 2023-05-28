import { Detail, Form, Home, Landing } from './views';
import NavBar from './components/NavBar/NavBar';
import { Route, useLocation } from 'react-router-dom';
import './App.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3001/';

function App() {
  const location = useLocation();

  return (
    <div className='App'>
      {location.pathname !== '/' && <NavBar />}
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/detail/:id' component={Detail} />
      <Route path='/create' component={Form} />
    </div>
  );
}

export default App;
