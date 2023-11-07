import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../parts/Navbar'
import { AuthContext } from '../helper/Login';
import "./add.css";
export default function Add() {
  const { user} = useContext(AuthContext)
  
  const [game, setGame] = useState({
    name: '',
    price: 0,
    genre:'',
    photos: [],
    description: '',
    rating:0
    })
    const navigate = useNavigate();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setGame((prevGame) => ({
        ...prevGame,
        [name]: value,
      }));
    };



    const addNewItemHandler = () => {
      const formData = new FormData();
      formData.append('name', game.name);
      formData.append('price', game.price);
      formData.append('creator', game.creator);
      formData.append('genre', game.genre);
      formData.append('description', game.description);
      formData.append('rating', game.rating);
      for (let i = 0; i < game.photos.length; i++) {
        formData.append('photos', game.photos[i]);
      }
    
      axios.post('http://localhost:4500/add-products', formData)
        .then((response) => {
          console.log('Game added successfully:', response.data);
          navigate("/");
        })
        .catch((error) => {
          console.error('Error adding game:', error);
        });
    };
    

const handleFileChange = (e) => {
  const files = e.target.files;
  setGame((prevGame) => ({
    ...prevGame,
    photos: files,
  }));
  console.log('Game with photos:', game);
};
  return (
   <>
  <Navbar />
         <main className="container mt  mb-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <form className="product-form"  onSubmit={(e) => {
    e.preventDefault();
    addNewItemHandler();
  }}  encType="multipart/form-data" >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                placeholder='name'
                required
                onChange={handleInputChange}
             / >
            </div>
            <div className="form-group">
              <label htmlFor="creator">Creator</label>
              <input
                type="text"
                className="form-control"
                name="creator"
                id="creator"
                placeholder='creator'
                required
                onChange={handleInputChange}
             / >
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  name="price"
                  className="form-control"
                  id="price"
                  type="number"
                  placeholder="Price"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="genre" className="form-label">
                genre
                </label>
                <input
                  name="genre"
                  className="form-control"
                  id="genre"
                  type="text"
                  placeholder="genre"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <input
                  name="rating"
                  className="form-control"
                  id="rating"
                  type="number"
                  placeholder="rating"
                  onChange={handleInputChange}
                />
              </div>
            <div className="mb-3">
                <label htmlFor="photos" className="form-label">
                  Image
                </label>
                <input
                  name="photos"
                  type="file"
                  id="image"
                  className="form-control"
                  placeholder="Image"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
         
           
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="8"
                  className="form-control"
                  placeholder="Description"
                  required
                  onChange={handleInputChange}
                />
              </div>
           
            <div className="mb-3 text-center">
            <button type="submit" className="btn btn-primary">
      <h4>Add new items</h4>
    </button>
              </div>
          </form>
        </div>
      </div>
    </main>
   
   </>
  )
}
