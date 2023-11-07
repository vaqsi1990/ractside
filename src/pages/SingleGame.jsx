import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../parts/Navbar';
import Spinner from '../ui/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import addToCart from "../helper/Cart"
import { AuthContext } from '../helper/Login';
import deleteItem from '../helper/Delete';
import Gallery from '../parts/Gallery';
import Footer from '../parts/Footer';


const SingleGame = () => {
  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext);
  const userId = user?.details?._id;
  console.log(userId);
  const navigate = useNavigate();
  console.log(userId);
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
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  const imageSrc = `http://localhost:4500/uploads/${gameData?.photos[0]}`;

  if (!imageSrc) {
    return <div>Error: Image not found</div>;
  }
  const handleAddToCart = async () => {
    try {
      if (!userId || !gameData) {
        console.error('Invalid user or game data');
        return;
      }
  
      console.log('Adding to cart. User:', userId, 'Game:', gameData);
  
      if (!loading && gameData) {
       
        await addToCart(userId, gameData);
      }
  
      console.log('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

const deleteGame = async () => {
    try {
      await deleteItem(gameData._id)
      console.log('game deleted',  'Game:', gameData);
      navigate('/');
    } catch (error) {
      console.error('Error delete:', error);
    }
  }

  return (
    <div>
      <Navbar />

      <main className="mt-5 text-white" style={{backgroundColor: '#0b0c2a'}}>
        <div className="container d-flex align-items-center flex-column justify-content-center min-vh-100">
          <div className="row">
            <div className="col-md-5">
              <div className="image">
                <img
                  src={imageSrc}
                  alt={gameData?.name}
                  className={`img-fluid ${imageLoaded ? 'visible' : 'hidden'}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setError(new Error('Image loading error'))}
                />
                {!imageLoaded && <Spinner />}
              </div>
            </div>
            <div className="col-md-7">
              <div className="text-center">
                <h1>Name: {gameData?.name}</h1>
                <h3> Created by: {gameData?.creator} </h3>
     
                <h3> Price:{gameData?.price}$ </h3>
                <hr />
                <h3 style={{fontSize:"17px"}}> {gameData?.description} </h3>
              </div>
              <div className='d-flex justify-content-center'>
                { user && (

                <button onClick={handleAddToCart} type="button" className="btn btn-success">add to cart </button>
                ) }
              { user && user.isAdmin && (

                <button onClick={deleteGame}  type="button" className="btn btn-success mx-3"> delete  </button>
              )}
              </div>
            </div>
          </div>
        </div>
      <Gallery />
      <Footer />
      </main>
    </div>
  );
}

export default SingleGame;
