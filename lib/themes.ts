import { Theme } from './types';

export const themes: Theme[] = [
  {
    id: 'modern-minimal',
    name: 'Modern Minimal',
    description: 'Clean, minimalist design with focus on products. Perfect for fashion and lifestyle brands.',
    thumbnail: '/themes/modern-minimal.jpg',
    category: 'minimal',
    features: ['Clean Layout', 'Large Product Images', 'Smooth Animations', 'Mobile Optimized']
  },
  {
    id: 'bold-vibrant',
    name: 'Bold & Vibrant',
    description: 'Eye-catching design with vibrant colors. Ideal for creative and energetic brands.',
    thumbnail: '/themes/bold-vibrant.jpg',
    category: 'bold',
    features: ['Vibrant Colors', 'Dynamic Layouts', 'Interactive Elements', 'Bold Typography']
  },
  {
    id: 'classic-elegant',
    name: 'Classic Elegant',
    description: 'Timeless and sophisticated design. Perfect for luxury and premium brands.',
    thumbnail: '/themes/classic-elegant.jpg',
    category: 'classic',
    features: ['Elegant Typography', 'Refined Spacing', 'Luxury Feel', 'Premium Aesthetics']
  },
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    description: 'Sleek, tech-focused design with modern UI elements. Great for tech products.',
    thumbnail: '/themes/tech-modern.jpg',
    category: 'modern',
    features: ['Tech-Focused', 'Grid Layouts', 'Modern UI', 'Feature Highlights']
  },
  {
    id: 'boutique-chic',
    name: 'Boutique Chic',
    description: 'Stylish and trendy design for boutique stores. Perfect for fashion retailers.',
    thumbnail: '/themes/boutique-chic.jpg',
    category: 'modern',
    features: ['Trendy Design', 'Product Focus', 'Instagram Ready', 'Social Integration']
  },
  {
    id: 'minimal-zen',
    name: 'Minimal Zen',
    description: 'Ultra-minimal design with maximum white space. Perfect for wellness brands.',
    thumbnail: '/themes/minimal-zen.jpg',
    category: 'minimal',
    features: ['Maximum Whitespace', 'Calm Aesthetics', 'Zen Philosophy', 'Focus on Content']
  },
  {
    id: 'urban-edge',
    name: 'Urban Edge',
    description: 'Urban, edgy design with dark mode support. Great for streetwear brands.',
    thumbnail: '/themes/urban-edge.jpg',
    category: 'bold',
    features: ['Dark Mode', 'Urban Aesthetics', 'Bold Contrasts', 'Street Style']
  },
  {
    id: 'organic-natural',
    name: 'Organic Natural',
    description: 'Natural, earth-toned design. Perfect for organic and eco-friendly products.',
    thumbnail: '/themes/organic-natural.jpg',
    category: 'classic',
    features: ['Earth Tones', 'Natural Feel', 'Eco-Friendly', 'Organic Shapes']
  }
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find(theme => theme.id === id);
}

export function getThemesByCategory(category: Theme['category']): Theme[] {
  return themes.filter(theme => theme.category === category);
}
