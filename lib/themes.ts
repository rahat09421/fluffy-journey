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
    description: 'Sleek, tech-focused design with modern UI elements. Great for tech products and startups.',
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
    description: 'Ultra-minimal design with maximum white space. Perfect for wellness and lifestyle brands.',
    thumbnail: '/themes/minimal-zen.jpg',
    category: 'minimal',
    features: ['Maximum Whitespace', 'Calm Aesthetics', 'Zen Philosophy', 'Focus on Content']
  },
  {
    id: 'urban-edge',
    name: 'Urban Edge',
    description: 'Urban, edgy design with dark mode support. Great for streetwear and youth brands.',
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
  },
  {
    id: 'luxury-premium',
    name: 'Luxury Premium',
    description: 'High-end luxury design with gold accents. Ideal for premium and exclusive brands.',
    thumbnail: '/themes/luxury-premium.jpg',
    category: 'classic',
    features: ['Gold Accents', 'Exclusive Feel', 'Premium Materials', 'Sophisticated Design']
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    description: 'Futuristic cyberpunk design with neon effects. Perfect for gaming and tech brands.',
    thumbnail: '/themes/neon-cyber.jpg',
    category: 'bold',
    features: ['Neon Glows', 'Cyber Aesthetics', 'Futuristic UI', 'Dark Background']
  },
  {
    id: 'soft-pastel',
    name: 'Soft Pastel',
    description: 'Gentle pastel colors with soft gradients. Great for beauty and lifestyle products.',
    thumbnail: '/themes/soft-pastel.jpg',
    category: 'minimal',
    features: ['Pastel Colors', 'Soft Gradients', 'Gentle Aesthetics', 'Light & Airy']
  },
  {
    id: 'vintage-retro',
    name: 'Vintage Retro',
    description: 'Nostalgic retro design with vintage elements. Perfect for artisan and craft brands.',
    thumbnail: '/themes/vintage-retro.jpg',
    category: 'classic',
    features: ['Vintage Typography', 'Retro Colors', 'Classic Elements', 'Nostalgic Feel']
  },
  {
    id: 'corporate-pro',
    name: 'Corporate Professional',
    description: 'Clean corporate design for B2B and professional services. Trustworthy and reliable.',
    thumbnail: '/themes/corporate-pro.jpg',
    category: 'modern',
    features: ['Professional Look', 'Corporate Colors', 'Trust Building', 'Business Focused']
  },
  {
    id: 'artistic-creative',
    name: 'Artistic Creative',
    description: 'Creative and artistic design with unique layouts. Perfect for artists and designers.',
    thumbnail: '/themes/artistic-creative.jpg',
    category: 'bold',
    features: ['Unique Layouts', 'Artistic Elements', 'Creative Freedom', 'Portfolio Style']
  },
  {
    id: 'minimalist-mono',
    name: 'Minimalist Monochrome',
    description: 'Pure black and white minimalist design. Bold statement through simplicity.',
    thumbnail: '/themes/minimalist-mono.jpg',
    category: 'minimal',
    features: ['Black & White', 'Ultra Clean', 'Typography Focus', 'High Contrast']
  },
  {
    id: 'gradient-modern',
    name: 'Gradient Modern',
    description: 'Modern design with vibrant gradients. Eye-catching and contemporary.',
    thumbnail: '/themes/gradient-modern.jpg',
    category: 'modern',
    features: ['Vibrant Gradients', 'Modern Look', 'Colorful Design', 'Contemporary Style']
  }
];

export function getThemeById(id: string): Theme | undefined {
  return themes.find(theme => theme.id === id);
}

export function getThemesByCategory(category: Theme['category']): Theme[] {
  return themes.filter(theme => theme.category === category);
}

export function getThemeCount(): number {
  return themes.length;
}

export function getThemeCategories(): Array<{ category: Theme['category']; count: number }> {
  const categories = ['modern', 'classic', 'minimal', 'bold'] as const;
  return categories.map(cat => ({
    category: cat,
    count: themes.filter(t => t.category === cat).length
  }));
}
