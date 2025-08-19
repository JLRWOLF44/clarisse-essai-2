// src/types/index.ts
export interface CarouselProps {
  images: string[];
  favorites: string[];
  toggleFavorite: (image: string) => void;
}

// Autres types si nécessaire
export interface ImageData {
  url: string;
  tags: string[];
}