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

export interface Category {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  category: Category;
  featuredImage: {
    url: string;
    alt: string;
  };
  createdAt: string;
}

export interface MenuItem {
  label: string;
  href: string;
}
