import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Home from  './pages/Home';
import DetailRecette from './pages/DetailRecette';
import  {AjoutRecette}  from './pages/AjoutRecette';
import  {Recettes}  from './pages/Recettes';

import { Favorites } from './pages/Favorites';


function App() {
  return (
    <Router>
      <div className="min">
        <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<DetailRecette />} />
            <Route path="/recettes" element={<Recettes />} />
            <Route path="/ajoutRecette" element={<AjoutRecette />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;