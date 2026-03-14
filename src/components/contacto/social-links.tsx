import { FacebookIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';

const SOCIAL_DATA = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100063067038840',
    icon: FacebookIcon,
    className: 'bg-[#1877F2] hover:bg-[#1565C0] text-white',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/oscar.gomez64/',
    icon: InstagramIcon,
    className: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 text-white',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@oscargomezproducciones4552',
    icon: YoutubeIcon,
    className: 'bg-[#FF0000] hover:bg-[#CC0000] text-white',
  },
] as const;

export function SocialLinks() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {SOCIAL_DATA.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 rounded-xl px-6 py-6 text-lg font-semibold transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98] ${social.className}`}
        >
          <social.icon className="h-7 w-7" />
          {social.name}
        </a>
      ))}
    </div>
  );
}
