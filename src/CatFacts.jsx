import React, { useState, useEffect } from 'react';
import './catFacts.css';
import clickSound1 from '/click1.mp3';
import clickSound2 from '/click2.mp3';
import clickSound3 from '/click3.mp3';
import clickSound4 from '/click4.mp3';
import clickSound5 from '/click5.mp3';
import clickSound6 from '/click6.mp3';

const CatFacts = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(true);

  const soundEffects = [clickSound1, clickSound2, clickSound3, clickSound4, clickSound5, clickSound6];

  const fetchCatFact = () => {
    setLoading(true);
    fetch('https://catfact.ninja/fact')
      .then(response => response.json())
      .then(data => {
        setFact(data.fact);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the cat fact:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCatFact(); // Fetch a cat fact when the component mounts
  }, []);

  const playRandomSound = () => {
    const randomIndex = Math.floor(Math.random() * soundEffects.length);
    new Audio(soundEffects[randomIndex]).play();
  };

  return (
    <div className="cat-fact-container">
      <a href="/">
        <img src='./cat-title.png' alt="Nyan Cat Title" className="title" />
      </a>
      {loading ? <div className="spinner"></div> : <p>{fact}</p>}
      <button onClick={() => { fetchCatFact(); playRandomSound(); }}>more</button>
    </div>
  );
};

export default CatFacts;
