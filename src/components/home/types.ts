export interface Ad {
  id: number;
  title: string;
  image: {
    url: string;
    alt: string;
  };
  link: string;
  isActive: boolean;
}
