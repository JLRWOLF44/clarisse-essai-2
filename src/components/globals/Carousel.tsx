import { useState, useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext'; // Ajuste le chemin
import './Carousel.css';

// Définition des props
interface CarouselProps {
  images: string[]; // Liste des URLs d'images
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const { favorites, toggleFavorite } = useFavorites(); // Récupère depuis le contexte
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('none');
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    let intervalId: NodeJS.Timeout | number | undefined;

    if (direction !== 'none' && images.length > 0) {
      intervalId = setInterval(() => {
        setCurrentIndex((prev) => {
          if (direction === 'right') {
            return (prev + 1) % images.length;
          } else if (direction === 'left') {
            return (prev - 1 + images.length) % images.length;
          }
          return prev;
        });
      }, 1500);
    }

    return () => clearInterval(intervalId);
  }, [direction, images.length]);

  const handleMouseEnter = (side: string) => {
    setDirection(side);
  };

  const handleMouseLeave = () => {
    setDirection('none');
  };

  const getVisibleIndices = () => {
    const indices = [];
    indices.push((currentIndex - 1 + images.length) % images.length);
    indices.push(currentIndex);
    indices.push((currentIndex + 1) % images.length);
    return indices;
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(images[index]);
    setIsEnlarged(true);
  };

  const closeEnlarged = () => {
    setIsEnlarged(false);
    setSelectedImage('');
  };

  const goLeft = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goRight = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="carousel" onMouseLeave={handleMouseLeave}>
      <div className="carousel-controls">
        <button onClick={goLeft} className="carousel-arrow">⟨</button>
        <button onClick={goRight} className="carousel-arrow">⟩</button>
      </div>
      <div className="carousel-container">
        {images.length > 0 ? (
          getVisibleIndices().map((index) => (
            <div
              key={index}
              className={`card ${index === currentIndex ? 'card-center' : 'card-side'}`}
              onMouseEnter={() => handleMouseEnter(index === 0 ? 'left' : index === 2 ? 'right' : 'none')}
            >
              <img
                src={images[index]}
                alt={`Slide ${index + 1}`}
                onClick={() => handleImageClick(index)}
                style={{ cursor: 'pointer' }}
              />
              <button
                onClick={() => toggleFavorite(images[index])}
                className="favorite-button"
              >
                {favorites.includes(images[index])
                  ? 'Retirer des favoris'
                  : 'Ajouter aux favoris'}
              </button>
            </div>
          ))
        ) : (
          <p>Aucune image à afficher.</p>
        )}
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