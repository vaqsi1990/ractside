import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Carousel, CarouselItem, CarouselIndicators, CarouselControl } from 'reactstrap';
import './hero.css'
import { Link } from 'react-router-dom';
export default function Hero() {
  const { data } = useFetch('http://localhost:4500/api/v1/games');
  const favouriteGames = data.filter((game) => game.favourite > 0);
 

  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    const nextIndex = activeIndex === favouriteGames.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    const nextIndex = activeIndex === 0 ? favouriteGames.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  return (
    <div className='container '>
      <div className='row'>

    <Carousel activeIndex={activeIndex} next={next} previous={previous} className='mt'>
      <CarouselIndicators items={favouriteGames} activeIndex={activeIndex} onClickHandler={setActiveIndex} />
      {favouriteGames.map((game, index) => (
        <CarouselItem key={index} >
          {game.photos && game.photos.length > 0 && (

            <img className="img-fluid" src={`http://localhost:4500/uploads/${game.photos[0]}`} alt={game.name} />
          )}
         <div className="carousel-content">
     
    </div>
        </CarouselItem>
      ))}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
      </div>
    </div>
  );
}
