import Image from 'next/image';

export function AdminLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src="/og-logo-black.png"
        alt="Oscar Gómez Producciones"
        width={320}
        height={90}
        className="w-auto h-32"
        priority
      />
      <p className="text-base text-muted-foreground">Iniciá sesión como administrador</p>
    </div>
  );
}
