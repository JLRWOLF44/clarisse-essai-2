import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageList } from '../../../imageList'; // Ajuste le chemin
import Carousel from '../Carousel';
import './Images.css';

const Images: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('');
  const [filteredImages, setFilteredImages] = useState<string[]>(imageList.map((item) => item.url));

  useEffect(() => {
    if (filter.trim() === '') {
      setFilteredImages(imageList.map((item) => item.url));
    } else {
      const lowercasedFilter = filter.toLowerCase();
      setFilteredImages(
        imageList
          .filter((item) => item.tags.some((tag) => tag.toLowerCase().includes(lowercasedFilter)))
          .map((item) => item.url)
      );
    }
  }, [filter]);

  const goToFavorites = () => {
    navigate('/Favorites');
  };

  console.log('Filter:', filter);
  console.log('Filtered Images:', filteredImages);

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
      <Carousel images={filteredImages} />
      <button onClick={goToFavorites} className="favorites-button">
        Voir les Favoris
      </button>
    </div>
  );
};

export default Images;