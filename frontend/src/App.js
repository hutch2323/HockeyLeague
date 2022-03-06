import './App.css';
import { Routes, Route } from "react-router-dom";
import { Home, About, Standings } from './pages';
import { useState, useEffect } from 'react';

export default function App() {
  const [scores, setScores] = useState(null);
  const [standings, setStandings] = useState(null);
  // const [newMovie, setNewMovie] = useState(false);

  useEffect(() => {
      fetch('/api/scores')
      .then((response) => response.json())
      .then(setScores)
    }, []);

  useEffect(() => {
    fetch('/api/getStandings')
    .then((response) => response.json())
    .then(setStandings)
  }, []);

    // useEffect(() => {
    //   // fetch('/api/movies')
    //   // .then((response) => response.json())
    //   // .then(setMovies)
    //   let allTeams = []
    //   setTeams(allTeams);
    // }, []);

  if( scores == null) return null;
  if( standings == null) return null;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home scores={scores}/>}/>
        <Route path="/standings" element={<Standings standings={standings} scores={scores} setStandings={setStandings}/>}/>
        <Route path="/about" element={<About scores={scores}/>}/>
      </Routes>
    </div> 
  );
}

// export default App;

function GetSortOrderDescending(prop) {    
  return function(a, b) {    
      if (a[prop] < b[prop]) {    
          return 1;    
      } else if (a[prop] > b[prop]) {    
          return -1;    
      }    
      return 0;    
  }    
} 
