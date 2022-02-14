import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import DisplayCards from './components/displayCards';
import { Spinner } from 'react-bootstrap';

function App() {
  const [ spinner, setSpinner ] = useState(true);

  useEffect(() => {
    setTimeout(() => setSpinner(false), 2000)
    console.log(spinner)
  }, []);

  return (
      <>
        {
          spinner ? 
          <div className='loading_screen'> 
          <Spinner animation="grow" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="grow" variant="success" />
          <Spinner animation="grow" variant="danger" />
          <h5>Task-notes app made by Ali Shoaib</h5>
          </div>
          :
          <div>
            <Header />
            <DisplayCards />
          </div>
        }
      </>
  );
}

export default App;
