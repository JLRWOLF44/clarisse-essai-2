import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageList } from '../../../imageList';
import Carousel from '../Carousel'; // Ajuste le chemin si nécessaire
import './Images.css';

const Images: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [filteredImages, setFilteredImages] = useState<string[]>(imageList);

  useEffect(() => {
    if (filter.trim() === '') {
      setFilteredImages(imageList);
    } else {
      const lowercasedFilter = filter.toLowerCase();
      setFilteredImages(
        imageList.filter((img) => { // Renomme 'image' en 'img' pour éviter confusion
          const keywords = ['paysage', 'portrait', 'nature', 'ville']; // Exemple
          return keywords.some((keyword) =>
            keyword.toLowerCase().includes(lowercasedFilter) ||
            img.toLowerCase().includes(lowercasedFilter)
          );
        })
      );
    }
  }, [filter]);

  const goToFavorites = () => {
    navigate('/Favorites');
  };

  return (
    <div className="images-container">
      <h1>Page des Images</h1>
      <div className="filter-section">
        <input
          type="text"
          placeholder="Filtrer par mot-clé (ex. paysage, portrait)..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-input"
        />
      </div>
      <Carousel images={filteredImages} /> {/* Passe uniquement 'images' */}
      <button onClick={goToFavorites} className="favorites-button">
        Voir les Favoris
      </button>
    </div>
  );
};

export default Images;