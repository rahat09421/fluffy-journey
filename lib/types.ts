export interface Store {
  id: string;
  userId: string;
  brandName: string;
  tagline: string;
  description: string;
  subdomain: string;
  themeId: string;
  colorScheme: ColorScheme;
  logo?: string;
  products: Product[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  features: string[];
  image: string;
  tags: string[];
  inventory?: number;
  createdAt: Date;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'modern' | 'classic' | 'minimal' | 'bold';
  features: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'starter' | 'professional' | 'enterprise';
  stores: string[];
  createdAt: Date;
}
