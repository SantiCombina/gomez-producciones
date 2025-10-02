import type { Ad, Post, MenuItem } from './types';

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

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'Nueva empresa llega al distrito con propuesta innovadora',
    description:
      'Una empresa de tecnología se instala en la zona con la promesa de generar más de 200 empleos directos para la comunidad local.',
    category: { id: 1, name: 'Economía' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      alt: 'Oficina moderna',
    },
    createdAt: '2024-10-02T10:30:00Z',
  },
  {
    id: 2,
    title: 'Inauguración del nuevo centro de salud municipal',
    description:
      'El intendente inauguró las nuevas instalaciones que contarán con equipamiento de última generación y atención las 24 horas.',
    category: { id: 2, name: 'Salud' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&h=400&fit=crop',
      alt: 'Centro médico',
    },
    createdAt: '2024-10-01T15:45:00Z',
  },
  {
    id: 3,
    title: 'Festival de música local reunió a más de 5000 personas',
    description:
      'El evento cultural más importante del año se desarrolló sin inconvenientes en la plaza central con artistas locales.',
    category: { id: 3, name: 'Cultura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      alt: 'Concierto al aire libre',
    },
    createdAt: '2024-09-30T20:00:00Z',
  },
  {
    id: 4,
    title: 'Obras de pavimentación en el barrio San Martín',
    description: 'Comenzaron los trabajos de asfaltado que beneficiarán a más de 500 familias de la zona oeste.',
    category: { id: 4, name: 'Obras Públicas' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop',
      alt: 'Obras de pavimentación',
    },
    createdAt: '2024-09-29T08:15:00Z',
  },
  {
    id: 5,
    title: 'Torneo de fútbol infantil convoca a 20 equipos',
    description: 'El campeonato municipal reunirá a niños de 6 a 12 años en una competencia que durará dos meses.',
    category: { id: 5, name: 'Deportes' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
      alt: 'Niños jugando fútbol',
    },
    createdAt: '2024-09-28T14:20:00Z',
  },
  {
    id: 6,
    title: 'Capacitación gratuita en oficios para jóvenes',
    description:
      'El programa municipal ofrece cursos de carpintería, electricidad y plomería para personas de 18 a 30 años.',
    category: { id: 6, name: 'Educación' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=400&fit=crop',
      alt: 'Taller de carpintería',
    },
    createdAt: '2024-09-27T11:00:00Z',
  },
  {
    id: 7,
    title: 'Mercado de productores locales todos los sábados',
    description: 'La feria municipal promociona productos frescos y artesanías de emprendedores de la zona.',
    category: { id: 1, name: 'Economía' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop',
      alt: 'Mercado de productores',
    },
    createdAt: '2024-09-26T09:30:00Z',
  },
  {
    id: 8,
    title: 'Campaña de vacunación contra la gripe comenzó',
    description: 'Los centros de salud municipales aplicarán dosis gratuitas a grupos de riesgo hasta fin de mes.',
    category: { id: 2, name: 'Salud' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      alt: 'Vacunación',
    },
    createdAt: '2024-09-25T13:45:00Z',
  },
  {
    id: 9,
    title: 'Biblioteca municipal amplía horarios de atención',
    description:
      'El espacio cultural funcionará de lunes a sábados con nuevos servicios digitales y talleres de lectura.',
    category: { id: 3, name: 'Cultura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      alt: 'Interior de biblioteca',
    },
    createdAt: '2024-09-24T16:10:00Z',
  },
  {
    id: 10,
    title: 'Nuevo semáforo instalado en avenida principal',
    description: 'La medida busca mejorar la seguridad vial en una de las arterias más transitadas del distrito.',
    category: { id: 7, name: 'Seguridad' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=400&fit=crop',
      alt: 'Semáforo en intersección',
    },
    createdAt: '2024-09-23T12:30:00Z',
  },
  {
    id: 11,
    title: 'Charla sobre prevención de accidentes domésticos',
    description: 'Bomberos voluntarios brindarán consejos de seguridad para el hogar en el salón comunitario.',
    category: { id: 7, name: 'Seguridad' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=400&fit=crop',
      alt: 'Charla de bomberos',
    },
    createdAt: '2024-09-22T18:00:00Z',
  },
  {
    id: 12,
    title: 'Programa de microcréditos para emprendedores',
    description: 'El municipio lanza una iniciativa para financiar pequeños negocios con tasas preferenciales.',
    category: { id: 1, name: 'Economía' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      alt: 'Emprendedores trabajando',
    },
    createdAt: '2024-09-21T10:15:00Z',
  },
  {
    id: 13,
    title: 'Jornada de adopción responsable de mascotas',
    description:
      'El refugio municipal organiza un evento para encontrar hogares a perros y gatos en situación de calle.',
    category: { id: 8, name: 'Medio Ambiente' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=400&fit=crop',
      alt: 'Adopción de mascotas',
    },
    createdAt: '2024-09-20T14:45:00Z',
  },
  {
    id: 14,
    title: 'Renovación de la plaza del barrio Norte',
    description: 'Los trabajos incluyen nuevos juegos infantiles, iluminación LED y espacios verdes mejorados.',
    category: { id: 4, name: 'Obras Públicas' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=400&fit=crop',
      alt: 'Plaza renovada',
    },
    createdAt: '2024-09-19T11:20:00Z',
  },
  {
    id: 15,
    title: 'Escuela de música abre inscripciones',
    description: 'Clases gratuitas de guitarra, piano y canto para niños y adultos en el centro cultural municipal.',
    category: { id: 6, name: 'Educación' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      alt: 'Clases de música',
    },
    createdAt: '2024-09-18T15:30:00Z',
  },
  {
    id: 16,
    title: 'Maratón solidaria recauda fondos para hospital',
    description: 'Más de 300 corredores participaron en la carrera benéfica que logró recaudar $500.000.',
    category: { id: 5, name: 'Deportes' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      alt: 'Maratón solidaria',
    },
    createdAt: '2024-09-17T07:00:00Z',
  },
  {
    id: 17,
    title: 'Operativo de limpieza en espacios públicos',
    description: 'Brigadas municipales intensifican tareas de mantenimiento en plazas y avenidas principales.',
    category: { id: 8, name: 'Medio Ambiente' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      alt: 'Limpieza urbana',
    },
    createdAt: '2024-09-16T08:30:00Z',
  },
];

export const menuItems: MenuItem[] = [
  { label: 'Noticias', href: '#' },
  { label: 'Contacto', href: '#' },
  { label: 'Nosotros', href: '#' },
];
