interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container py-8">
      <h1>Detalle de Noticia</h1>
      <p>ID: {id}</p>
      {/* Contenido del detalle de la noticia */}
    </div>
  );
}
