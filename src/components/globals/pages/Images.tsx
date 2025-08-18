import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../Carousel';
import './Images.css';

const Images: React.FC = () => {
  const navigate = useNavigate();

  const goToFavorites = () => {
    navigate('/Favorites');
  };

  return (
    <div>
      <h1>Page des Images</h1>
      <Carousel />
      <button onClick={goToFavorites}>Voir les Favoris</button>
    </div>
  );
};

export default Images;