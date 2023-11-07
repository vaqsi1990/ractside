import React, { useState, useEffect } from 'react';


const Ganre = ({ onGenreChange }) => {
  const [selectedGenre, setSelectedGenre] = useState('');
 
  
  

  const handleGenreSelection = (genre) => {
    setSelectedGenre(genre);
  };

  useEffect(() => {
    // Handle changes to the selectedGenre (e.g., update state or notify parent)
    onGenreChange(selectedGenre);
  }, [selectedGenre, onGenreChange]);

  return (
    <>
      <div className="filter">
        <button
          className="btn btn-default"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-filter"
          aria-expanded="false"
          aria-controls="mobile-filter"
        >
         <span className="fa fa-filter pl-1"></span>
        </button>
      </div>
      <div id="mobile-filter">
        <div>
          <h6 className="p-1 border-bottom">Filter By Genre</h6>
          <ul>
       <li>
       <input
                type="checkbox"
                id="all"
                checked={!selectedGenre}
                onChange={() => handleGenreSelection('')}
              />
              <label htmlFor="all">All</label>
       </li>
            <li>
             
               <input
                type="checkbox"
                id="adventure"
                checked={selectedGenre === 'action'}
                onChange={() => handleGenreSelection('action')}
              />
              <label htmlFor="action">Action</label>
            </li>
            <li>
            <input
                type="checkbox"
                id="action"
                checked={selectedGenre === 'adventure'}
                onChange={() => handleGenreSelection('adventure')}
              />
              <label htmlFor="adventure">Adventure</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="rpg"
                checked={selectedGenre === 'rpg'}
                onChange={() => handleGenreSelection('rpg')}
              />
              <label htmlFor="rpg">RPG</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="shooter"
                checked={selectedGenre === 'shooter'}
                onChange={() => handleGenreSelection('shooter')}
              />
              <label htmlFor="shooter">Shooter</label>
            </li>
          </ul>
        </div>
      </div>

   
    </>
  );

};

export default Ganre;
