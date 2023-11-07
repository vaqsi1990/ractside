import React, { useEffect, useState } from 'react';

import 'react-image-lightbox/style.css';

import { useParams } from 'react-router-dom';

// ... (imports)

const Gallery = () => {
  const [gameData, setGameData] = useState(null);
  const { id } = useParams();
  const [model, setModel] = useState(false);
  const [tempingSrc, setTempingSrc] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4500/api/v1/games/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.log(error);
      } 
    };
    fetchData();
  }, [id]);

  const imageGal = Array.isArray(gameData?.photos) ? gameData?.photos : [];

  const getImg = (image) => {
    setTempingSrc(image);
    setModel(true);
  };

  return (
    <div className="container">
    
      <div className="row d-flex flex-wrap align-items-center ">
        {imageGal.map((image, index) => (
          <div
            key={index}
            className="col-md-3 gallery"
            onClick={() => getImg(image)}
          >
            <img
              src={`http://localhost:4500/uploads/${image}`}
              alt={`${gameData?.name}`}
              className="img-fluid"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;


