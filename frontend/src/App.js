import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, About } from './pages';
import { useState, useEffect } from 'react';

function App() {
  const [scores, setScores] = useState([]);
  // const [newMovie, setNewMovie] = useState(false);

  useEffect(() => {
      fetch('/api/scores')
      .then((response) => response.json())
      .then(setScores)
    }, []);

    // useEffect(() => {
    //   // fetch('/api/movies')
    //   // .then((response) => response.json())
    //   // .then(setMovies)
    //   let allTeams = []
    //   setTeams(allTeams);
    // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home scores={scores}/>}/>
        <Route path="/about" element={<About scores={scores}/>}/>
      </Routes>
    </div> 
  );
}

export default App;
