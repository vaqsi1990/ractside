import React, { useState } from 'react'
import useFetch from '../hooks/useFetch'
import { Link } from 'react-router-dom';

import Ganre from './filter/ganre/Ganre';
import Pagination from '../ui/Pagination';



const PAGE_SIZE = 6;
export default function Middle() {
   const {data} = useFetch('http://localhost:4500/api/v1/games')
   const [filteredGenre, setFilteredGenre] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedGenre, setSelectedGenre] = useState('');
 console.log(data);
  
   const nonDiscountGames = data.filter((game) => Math.round(game.favourite) === 0);

   const handleGenreChange = (genre) => {
     setFilteredGenre(genre);
   };
 
   const filteredGames = data.filter((game) => game.genre && game.genre.includes(filteredGenre));
   const startIndex = (currentPage - 1) * PAGE_SIZE;
   const endIndex = Math.min(currentPage * PAGE_SIZE, filteredGames.length);
   const displayedGames = filteredGames.slice(startIndex, endIndex);
  return (
    <div className="container mb-5">
    <div className="row">
      
      <div className="col-md-2 text-white">
    <section className="sidebar">
    <Ganre onGenreChange={handleGenreChange} />
   
    </section>
  </div>

     
      <div className="col-md-10 mt-5">
        <div className="row">
       
          {displayedGames
              .filter((game) => !selectedGenre || game.genre.includes(selectedGenre)) 
              .map((game) => (
                <div key={game._id} className="col-lg-4 mb-4">
              <div className="card">
                <img style={{height:'30vh'}} className="card-img-top" src={`http://localhost:4500/uploads/${game.photos[0]}`} alt="cap" />
              
                <div className="card-body">
                  <div className="destination_city">
                    <div className="destination_name">
                      <h3>{game.name}</h3>
                      <h5>{game.creator}</h5>
                      <Link to={`/single/${game._id}`}>
                        <button type="button" className="btn btn-success">
                          Purchase
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              ))}
             <Pagination count={filteredGames.length} onPageChange={setCurrentPage} />
        </div>
      </div>
    </div>
  </div>
  
  );
}
