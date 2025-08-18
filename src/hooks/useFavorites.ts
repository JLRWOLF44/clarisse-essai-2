import { useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (imageUrl: string) => {
    setFavorites((prev) =>
      prev.includes(imageUrl) ? prev.filter((fav) => fav !== imageUrl) : [...prev, imageUrl]
    );
  };

  return { favorites, toggleFavorite };
};