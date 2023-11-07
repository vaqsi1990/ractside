
import React  from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function Sales() {
    const { data } = useFetch('http://localhost:4500/api/v1/games');
    const discountGames = data.filter((game) => game.discount > 0);


  return (

    <div className='container mt-5'>
        <div className="row justify-content-center">
        <div className="section_title text-center mb_70">
          <h3>Sales</h3>
        </div>
      </div>
        <div className="row">
         {discountGames.map((game) => (
          <div key={game._id} className="col-lg-4 col-md-6">
            <div className='card'>
           <div className='card-body'>
                <div className="destination_city">
                  <div className="destination_name">
                  <h3>{game.name}</h3>
                  <h5>{game.creator}</h5>
                  <p>Price: {game.price}%</p>
                  <p>Discount: {game.discount}%</p>
                  <Link to={`/single/${game._id}`}><button type="button" className="btn btn-success">Buy</button></Link>
               </div>
                  </div>
              </div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  )
}
