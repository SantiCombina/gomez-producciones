import Image from 'next/image';

export function OwnerProfile() {
  return (
    <div className="lg:flex lg:items-center lg:gap-16">
      <div className="lg:w-1/3 mb-8 lg:mb-0">
        <div className="relative w-72 h-96 mx-auto">
          <Image
            src="/OG.jpg"
            alt="Oscar Gomez - Fundador de Gómez Producciones"
            fill
            className="object-cover rounded-[4rem]"
            priority
          />
        </div>
      </div>

      <div className="lg:w-2/3 space-y-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Oscar Gomez</h2>
          <p className="text-lg text-muted-foreground">Fundador y Director</p>
        </div>

        <div className="space-y-4 text-base leading-relaxed">
          <p>
            Con más de dos décadas de experiencia en el mundo audiovisual, Oscar Gomez ha sido pionero en la producción
            de contenido televisivo y digital en Argentina.
          </p>

          <p>
            Su visión innovadora y compromiso con la excelencia han posicionado a Gómez Producciones como una de las
            productoras más respetadas del país, trabajando con los principales medios de comunicación y marcas.
          </p>

          <p>
            Egresado de la Universidad del Cine, Oscar ha dirigido y producido más de 200 proyectos, desde documentales
            hasta programas de entretenimiento, siempre manteniendo los más altos estándares de calidad y creatividad.
          </p>
        </div>
      </div>
    </div>
  );
}
