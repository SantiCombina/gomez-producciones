import { NavActiveLink } from './nav-active-link';

const navItems = [
  { href: '/', label: 'Inicio' },
  { href: '/about', label: 'Nosotros' },
  { href: '/contact', label: 'Contacto' },
];

export function Navigation() {
  return (
    <nav aria-label="Principal" className="hidden md:flex items-center gap-8">
      {navItems.map(({ href, label }) => (
        <NavActiveLink key={href} href={href} label={label} />
      ))}
    </nav>
  );
}
