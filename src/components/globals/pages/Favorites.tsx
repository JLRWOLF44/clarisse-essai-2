import React from 'react';
import { useFavorites } from '../../../context/FavoritesContext'; // Ajuste le chemin

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  console.log('Favorites in Favorites page:', favorites);

  return (
    <div>
      <h1>Mes Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun favori pour le moment.</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((imageUrl, index) => (
            <div key={index} className="card">
              <img src={imageUrl} alt={`Favori ${index + 1}`} />
              <button
                onClick={() => toggleFavorite(imageUrl)}
                style={{ marginTop: '10px' }}
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;