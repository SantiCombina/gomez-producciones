import React from 'react';
import '@/styles/globals.css';

export const metadata = {
  description: 'Minuto a minuto con información al instante de los hechos, desde un enfoque plenamente periodístico.',
  title: 'Gomez Producciones - Portal de Noticias',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
