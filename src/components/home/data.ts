import type { Ad } from './types';

export const mockAds: Ad[] = [
  {
    id: 1,
    title: 'Supermercado Central',
    image: {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=200&fit=crop',
      alt: 'Supermercado Central - Ofertas especiales',
    },
    link: '#',
    isActive: true,
  },
  {
    id: 2,
    title: 'Ferretería El Tornillo',
    image: {
      url: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=200&fit=crop',
      alt: 'Ferretería El Tornillo - Todo para construcción',
    },
    link: '#',
    isActive: true,
  },
  {
    id: 3,
    title: 'Panadería San José',
    image: {
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=200&fit=crop',
      alt: 'Panadería San José - Pan fresco todos los días',
    },
    link: '#',
    isActive: true,
  },
];
