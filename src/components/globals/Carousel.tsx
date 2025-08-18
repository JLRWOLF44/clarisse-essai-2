import { useState, useEffect } from 'react';
import { imageList } from '../../imageList';
import { useFavorites } from '../../context/FavoritesContext';
import './Carousel.css';

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('none'); // 'left', 'right', 'none'
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { favorites, toggleFavorite } = useFavorites();

  console.log('Current Index:', currentIndex);
  console.log('Direction:', direction);
  console.log('Favorites in Carousel:', favorites);

  // Défilement automatique avec intervalle
  useEffect(() => {
    let intervalId: number | undefined;

    if (direction !== 'none') {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => {
          if (direction === 'right') {
            return (prev + 1) % imageList.length;
          } else if (direction === 'left') {
            return (prev - 1 + imageList.length) % imageList.length;
          }
          return prev;
        });
      }, 1500); // Intervalle augmenté à 1500ms pour un défilement plus lent
    }

    return () => clearInterval(intervalId); // Arrête l'intervalle quand la direction change
  }, [direction]);

  // Gère le survol pour changer la direction
  const handleMouseEnter = (side: string) => {
    setDirection(side);
  };

  const handleMouseLeave = () => {
    setDirection('none');
  };

  const getVisibleIndices = () => {
    const indices = [];
    indices.push((currentIndex - 1 + imageList.length) % imageList.length); // Gauche
    indices.push(currentIndex); // Milieu
    indices.push((currentIndex + 1) % imageList.length); // Droite
    return indices;
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(imageList[index]);
    setIsEnlarged(true);
  };

  const closeEnlarged = () => {
    setIsEnlarged(false);
    setSelectedImage('');
  };

  // Ajout des fonctions pour défiler manuellement
  const goLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  return (
    <div className="carousel" onMouseLeave={handleMouseLeave}>
      <div className="carousel-controls">
        <button onClick={goLeft} className="carousel-arrow">⟨</button>
        <button onClick={goRight} className="carousel-arrow">⟩</button>
      </div>
      <div className="carousel-container">
        {getVisibleIndices().map((index, pos) => (
          <div
            key={index}
            className={`card ${pos === 1 ? 'card-center' : 'card-side'}`}
            onMouseEnter={() => handleMouseEnter(pos === 0 ? 'left' : pos === 2 ? 'right' : 'none')}
          >
            <img
              src={imageList[index]}
              alt={`Slide ${index + 1}`}
              onClick={() => handleImageClick(index)}
              style={{ cursor: 'pointer' }}
            />
            <button
              onClick={() => toggleFavorite(imageList[index])}
              className="favorite-button"
            >
              {favorites.includes(imageList[index])
                ? 'Retirer des favoris'
                : 'Ajouter aux favoris'}
            </button>
          </div>
        ))}
      </div>

      {isEnlarged && (
        <div className="enlarged-overlay" onClick={closeEnlarged}>
          <div className="enlarged-image-container" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged view" />
            <button onClick={closeEnlarged} className="close-button">
              X
            </button>
            <button
              onClick={() => toggleFavorite(selectedImage)}
              className="favorite-button"
            >
              {favorites.includes(selectedImage)
                ? 'Retirer des favoris'
                : 'Ajouter aux favoris'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;