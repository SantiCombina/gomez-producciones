import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const mockAds = [
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

const mockPosts = [
  {
    id: 1,
    title: 'Nueva empresa llega al distrito con propuesta innovadora',
    description:
      'Una empresa de tecnología se instala en la zona con la promesa de generar más de 200 empleos directos.',
    category: { id: 1, name: 'Economía' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop',
      alt: 'Oficina moderna',
    },
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: 'Inauguración del nuevo centro de salud municipal',
    description: 'El intendente inauguró las nuevas instalaciones que contarán con equipamiento de última generación.',
    category: { id: 2, name: 'Salud' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&h=400&fit=crop',
      alt: 'Centro médico',
    },
    createdAt: '2024-01-14T15:45:00Z',
  },
  {
    id: 3,
    title: 'Festival de música local reunió a más de 5000 personas',
    description: 'El evento cultural más importante del año se desarrolló sin inconvenientes.',
    category: { id: 3, name: 'Cultura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      alt: 'Concierto al aire libre',
    },
    createdAt: '2024-01-13T20:00:00Z',
  },
  {
    id: 4,
    title: 'Obras de pavimentación avanzan según cronograma',
    description:
      'Las obras de mejoramiento vial en el barrio Norte continúan su desarrollo y se espera su finalización para fin de mes.',
    category: { id: 4, name: 'Infraestructura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=400&fit=crop',
      alt: 'Obras de pavimentación',
    },
    createdAt: '2024-01-12T09:15:00Z',
  },
  {
    id: 5,
    title: 'Programa de capacitación laboral para jóvenes',
    description:
      'Se lanzó una nueva iniciativa para brindar herramientas de formación técnica y profesional a jóvenes de 18 a 25 años.',
    category: { id: 5, name: 'Educación' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
      alt: 'Estudiantes en capacitación',
    },
    createdAt: '2024-01-11T11:30:00Z',
  },
  {
    id: 6,
    title: 'Nueva propuesta deportiva para adultos mayores',
    description:
      'El municipio presenta un programa de actividad física adaptada para mejorar la calidad de vida de los adultos mayores.',
    category: { id: 6, name: 'Deportes' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      alt: 'Actividad física para adultos mayores',
    },
    createdAt: '2024-01-10T16:45:00Z',
  },
  {
    id: 7,
    title: 'Operativo de seguridad refuerza patrullaje nocturno',
    description:
      'La policía local implementó un nuevo operativo para garantizar la seguridad ciudadana durante las horas nocturnas.',
    category: { id: 7, name: 'Seguridad' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1583468982228-19f19164aee2?w=800&h=400&fit=crop',
      alt: 'Patrulla policial',
    },
    createdAt: '2024-01-09T14:20:00Z',
  },
  {
    id: 8,
    title: 'Mercado de productores locales abre los fines de semana',
    description:
      'Los productores agropecuarios de la región tendrán un espacio propio para comercializar sus productos frescos directamente al público.',
    category: { id: 1, name: 'Economía' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop',
      alt: 'Mercado de productores',
    },
    createdAt: '2024-01-08T08:00:00Z',
  },
  {
    id: 9,
    title: 'Campaña de concientización ambiental en las escuelas',
    description:
      'Los alumnos de primaria participan en talleres sobre reciclaje y cuidado del medio ambiente con actividades prácticas.',
    category: { id: 8, name: 'Medio Ambiente' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop',
      alt: 'Niños reciclando',
    },
    createdAt: '2024-01-07T13:15:00Z',
  },
  {
    id: 10,
    title: 'Torneo de fútbol infantil convoca a 30 equipos',
    description:
      'El campeonato anual de fútbol para menores de 12 años promete ser el más competitivo con la participación récord de equipos.',
    category: { id: 6, name: 'Deportes' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=400&fit=crop',
      alt: 'Niños jugando fútbol',
    },
    createdAt: '2024-01-06T17:30:00Z',
  },
  {
    id: 11,
    title: 'Biblioteca pública incorpora libros digitales',
    description:
      'La modernización de la biblioteca incluye una plataforma digital con más de 1000 títulos disponibles para préstamo virtual.',
    category: { id: 5, name: 'Educación' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      alt: 'Biblioteca moderna',
    },
    createdAt: '2024-01-05T10:45:00Z',
  },
  {
    id: 12,
    title: 'Operativo médico gratuito atenderá a 500 familias',
    description:
      'Especialistas de la capital realizarán consultas gratuitas en cardiología, pediatría y oftalmología durante tres días.',
    category: { id: 2, name: 'Salud' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      alt: 'Consulta médica',
    },
    createdAt: '2024-01-04T12:00:00Z',
  },
  {
    id: 13,
    title: 'Feria gastronómica destacará platos tradicionales',
    description:
      'Los mejores cocineros locales mostrarán sus especialidades en un evento que rescata las tradiciones culinarias de la región.',
    category: { id: 3, name: 'Cultura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop',
      alt: 'Feria gastronómica',
    },
    createdAt: '2024-01-03T19:00:00Z',
  },
  {
    id: 14,
    title: 'Nuevas luminarias LED mejoran la iluminación urbana',
    description:
      'El plan de modernización del alumbrado público incluye 200 nuevas luminarias LED que reducen el consumo energético en un 60%.',
    category: { id: 4, name: 'Infraestructura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&h=400&fit=crop',
      alt: 'Alumbrado público LED',
    },
    createdAt: '2024-01-02T15:30:00Z',
  },
  {
    id: 15,
    title: 'Curso de primeros auxilios para bomberos voluntarios',
    description:
      'Los bomberos voluntarios reciben capacitación especializada para mejorar la atención en emergencias médicas y accidentes.',
    category: { id: 7, name: 'Seguridad' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      alt: 'Capacitación bomberos',
    },
    createdAt: '2024-01-01T09:00:00Z',
  },
  {
    id: 16,
    title: 'Plan de forestación plantará 1000 árboles nativos',
    description:
      'La iniciativa ambiental busca mejorar la calidad del aire y crear espacios verdes en toda la ciudad con especies autóctonas.',
    category: { id: 8, name: 'Medio Ambiente' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
      alt: 'Plantación de árboles',
    },
    createdAt: '2023-12-31T11:15:00Z',
  },
  {
    id: 17,
    title: 'Subsidios para emprendimientos productivos',
    description:
      'El municipio lanza una línea de créditos blandos para apoyar nuevos emprendimientos locales con tasas preferenciales.',
    category: { id: 1, name: 'Economía' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=400&fit=crop',
      alt: 'Emprendimiento local',
    },
    createdAt: '2023-12-30T14:45:00Z',
  },
  {
    id: 18,
    title: 'Exposición de arte local en el centro cultural',
    description:
      'Artistas de la región exponen sus obras en una muestra colectiva que estará abierta al público durante todo el mes.',
    category: { id: 3, name: 'Cultura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
      alt: 'Exposición de arte',
    },
    createdAt: '2023-12-29T16:20:00Z',
  },
  {
    id: 19,
    title: 'Remodelación completa de la plaza central',
    description:
      'La plaza principal del distrito será completamente renovada con nuevos juegos infantiles, bancos y áreas verdes.',
    category: { id: 4, name: 'Infraestructura' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop',
      alt: 'Plaza en renovación',
    },
    createdAt: '2023-12-28T10:30:00Z',
  },
  {
    id: 20,
    title: 'Taller de computación para adultos mayores',
    description:
      'Un nuevo programa educativo enseña habilidades digitales básicas a personas de la tercera edad de forma gratuita.',
    category: { id: 5, name: 'Educación' },
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
      alt: 'Adultos aprendiendo computación',
    },
    createdAt: '2023-12-27T14:15:00Z',
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
  });
}

function AdBanner({ ad }: { ad: (typeof mockAds)[0] }) {
  return (
    <Card className="w-full overflow-hidden p-0">
      <div className="relative h-32">
        <img src={ad.image.url} alt={ad.image.alt} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="text-xs bg-black/70 text-white hover:bg-black/70">
            Publicidad
          </Badge>
        </div>
      </div>
    </Card>
  );
}

function Navigation() {
  const menuItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Noticias', href: '#' },
    { label: 'Deportes', href: '#' },
    { label: 'Cultura', href: '#' },
    { label: 'Economía', href: '#' },
    { label: 'Contacto', href: '#' },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {menuItems.map((item) => (
        <Button key={item.label} variant="ghost" size="sm" className="text-foreground hover:text-primary">
          {item.label}
        </Button>
      ))}
    </nav>
  );
}

function MobileMenu() {
  const menuItems = [
    { label: 'Inicio', href: '#' },
    { label: 'Noticias', href: '#' },
    { label: 'Deportes', href: '#' },
    { label: 'Cultura', href: '#' },
    { label: 'Economía', href: '#' },
    { label: 'Contacto', href: '#' },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Button key={item.label} variant="ghost" className="justify-start">
              {item.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default async function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <Card className="rounded-none border-x-0 border-t-0">
        <CardContent className="container py-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MobileMenu />
              <h1 className="text-xl font-bold">Gomez Producciones</h1>
            </div>
            <Navigation />
          </div>
        </CardContent>
      </Card>

      <div className="container pt-4">
        <AdBanner ad={mockAds[0]} />
      </div>

      <main className="container py-6">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* Featured Article */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Noticia Destacada</h2>
              <Card className="overflow-hidden p-0">
                <div className="relative h-64">
                  <img
                    src={mockPosts[0].featuredImage.url}
                    alt={mockPosts[0].featuredImage.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-0">
                    <Badge
                      variant="secondary"
                      className="bg-primary/90 text-primary-foreground rounded-l-none rounded-r-md"
                    >
                      {mockPosts[0].category.name}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <time className="text-xs text-muted-foreground mb-3 block">{formatDate(mockPosts[0].createdAt)}</time>
                  <CardTitle className="text-xl mb-3">{mockPosts[0].title}</CardTitle>
                  <CardDescription className="mb-4 text-base">{mockPosts[0].description}</CardDescription>
                  <Button variant="ghost" className="p-0 h-auto font-normal text-primary hover:text-primary/80">
                    Leer más →
                  </Button>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-8" />

            {/* Mid Banner Ad */}
            <div className="w-full">
              <AdBanner ad={mockAds[1]} />
            </div>

            <Separator className="my-8" />

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Últimas Noticias</h2>
              <div className="grid gap-8 sm:grid-cols-2">
                {mockPosts.slice(1).map((post) => (
                  <Card key={post.id} className="overflow-hidden p-0">
                    <div className="relative h-48">
                      <img
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-0">
                        <Badge
                          variant="secondary"
                          className="bg-primary/90 text-primary-foreground rounded-l-none rounded-r-md"
                        >
                          {post.category.name}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <time className="text-xs text-muted-foreground mb-2 block">{formatDate(post.createdAt)}</time>
                      <CardTitle className="text-lg mb-2">{post.title}</CardTitle>
                      <CardDescription className="text-base mb-3">{post.description}</CardDescription>
                      <Button
                        variant="ghost"
                        className="p-0 h-auto font-normal text-primary text-sm hover:text-primary/80"
                      >
                        Leer más →
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">{/* Placeholder for future content */}</div>
          </aside>
        </div>

        {/* Mobile Bottom Ad */}
        <div className="lg:hidden mt-8">
          <AdBanner ad={mockAds[2]} />
        </div>
      </main>
    </div>
  );
}
