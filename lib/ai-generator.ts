export interface BrandInfo {
  brandName: string;
  industry?: string;
  description?: string;
}

export interface ProductInput {
  name: string;
  category?: string;
  price?: number;
  features?: string[];
  image?: string;
}

export interface GeneratedStore {
  brandName: string;
  tagline: string;
  description: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  logo?: string;
  products: GeneratedProduct[];
}

export interface GeneratedProduct {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  features: string[];
  image: string;
  tags: string[];
}

const industries = {
  fashion: {
    taglines: [
      "Style That Speaks",
      "Redefine Your Wardrobe",
      "Where Fashion Meets Elegance",
      "Timeless Style, Modern Edge"
    ],
    colors: [
      { primary: "#1a1a1a", secondary: "#f5f5f5", accent: "#d4af37", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#2c3e50", secondary: "#ecf0f1", accent: "#e74c3c", background: "#ffffff", text: "#2c3e50" },
      { primary: "#8b4789", secondary: "#f8e8f8", accent: "#d4af37", background: "#ffffff", text: "#1a1a1a" }
    ]
  },
  tech: {
    taglines: [
      "Innovation at Your Fingertips",
      "Technology Redefined",
      "Future-Ready Solutions",
      "Smart Tech, Smarter Life"
    ],
    colors: [
      { primary: "#0066cc", secondary: "#f0f8ff", accent: "#ff6b35", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#1e3a8a", secondary: "#dbeafe", accent: "#10b981", background: "#ffffff", text: "#1e3a8a" },
      { primary: "#6366f1", secondary: "#eef2ff", accent: "#f59e0b", background: "#ffffff", text: "#1e3a8a" }
    ]
  },
  food: {
    taglines: [
      "Taste the Difference",
      "Fresh From Our Kitchen",
      "Delicious Moments Delivered",
      "Where Flavor Meets Quality"
    ],
    colors: [
      { primary: "#d97706", secondary: "#fef3c7", accent: "#dc2626", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#059669", secondary: "#d1fae5", accent: "#f59e0b", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#dc2626", secondary: "#fee2e2", accent: "#f59e0b", background: "#ffffff", text: "#1a1a1a" }
    ]
  },
  health: {
    taglines: [
      "Your Wellness Journey Starts Here",
      "Healthy Living Made Simple",
      "Natural Solutions for Better Health",
      "Empowering Your Health"
    ],
    colors: [
      { primary: "#10b981", secondary: "#d1fae5", accent: "#06b6d4", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#0891b2", secondary: "#cffafe", accent: "#10b981", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#8b5cf6", secondary: "#ede9fe", accent: "#10b981", background: "#ffffff", text: "#1a1a1a" }
    ]
  },
  home: {
    taglines: [
      "Make Your House a Home",
      "Living Spaces, Beautifully Crafted",
      "Transform Your Living Space",
      "Home Essentials, Elegantly Designed"
    ],
    colors: [
      { primary: "#92400e", secondary: "#fef3c7", accent: "#059669", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#1e40af", secondary: "#dbeafe", accent: "#f59e0b", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#4c1d95", secondary: "#ede9fe", accent: "#ec4899", background: "#ffffff", text: "#1a1a1a" }
    ]
  },
  default: {
    taglines: [
      "Excellence in Every Detail",
      "Quality You Can Trust",
      "Your Success, Our Mission",
      "Elevating Your Experience"
    ],
    colors: [
      { primary: "#1a1a1a", secondary: "#f5f5f5", accent: "#3b82f6", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#374151", secondary: "#f3f4f6", accent: "#10b981", background: "#ffffff", text: "#1a1a1a" },
      { primary: "#7c3aed", secondary: "#f5f3ff", accent: "#f59e0b", background: "#ffffff", text: "#1a1a1a" }
    ]
  }
};

const productDescriptionTemplates = {
  tech: [
    "cutting-edge technology",
    "innovative design",
    "seamless performance",
    "intuitive interface",
    "powerful features",
    "reliable and efficient"
  ],
  fashion: [
    "premium quality materials",
    "elegant design",
    "comfortable fit",
    "timeless style",
    "versatile and chic",
    "expertly crafted"
  ],
  food: [
    "fresh ingredients",
    "delicious flavor",
    "carefully prepared",
    "nutritious and wholesome",
    "authentic taste",
    "quality guaranteed"
  ],
  health: [
    "natural ingredients",
    "scientifically proven",
    "safe and effective",
    "gentle formula",
    "clinically tested",
    "wellness-focused"
  ],
  home: [
    "durable construction",
    "elegant design",
    "practical functionality",
    "space-saving",
    "easy to maintain",
    "premium materials"
  ],
  default: [
    "high quality",
    "reliable performance",
    "great value",
    "customer satisfaction",
    "trusted brand",
    "exceptional service"
  ]
};

function detectIndustry(brandName: string, description?: string): keyof typeof industries {
  const text = `${brandName} ${description || ""}`.toLowerCase();
  
  if (text.match(/fashion|clothing|apparel|wear|style|boutique/)) return 'fashion';
  if (text.match(/tech|software|digital|electronic|gadget|computer|smart/)) return 'tech';
  if (text.match(/food|restaurant|cafe|bakery|kitchen|culinary|cuisine/)) return 'food';
  if (text.match(/health|wellness|fitness|medical|pharmacy|care|therapy/)) return 'health';
  if (text.match(/home|furniture|decor|living|interior|house/)) return 'home';
  
  return 'default';
}

export function generateStoreContent(brandInfo: BrandInfo, products: ProductInput[]): GeneratedStore {
  const industry = brandInfo.industry as keyof typeof industries || detectIndustry(brandInfo.brandName, brandInfo.description);
  const industryData = industries[industry] || industries.default;
  
  const randomTagline = industryData.taglines[Math.floor(Math.random() * industryData.taglines.length)];
  const randomColorScheme = industryData.colors[Math.floor(Math.random() * industryData.colors.length)];
  
  const generatedDescription = brandInfo.description || 
    `Welcome to ${brandInfo.brandName}, where we bring you the finest selection of ${industry === 'default' ? 'products' : industry} products. Our commitment to quality and customer satisfaction sets us apart. Discover our curated collection designed to meet your needs and exceed your expectations.`;
  
  const generatedProducts = products.map((product, index) => {
    const productCategory = product.category || industry;
    const templates = productDescriptionTemplates[productCategory as keyof typeof productDescriptionTemplates] || productDescriptionTemplates.default;
    
    const shortDesc = `Experience ${templates[0]} with our ${product.name}. ${templates[1].charAt(0).toUpperCase() + templates[1].slice(1)} and ${templates[2]}, perfect for your needs.`;
    
    const longDesc = `Introducing the ${product.name}, a premium ${productCategory} product that combines ${templates[0]} with ${templates[1]}. Designed with attention to detail, this product offers ${templates[2]} and ${templates[3]}. Whether you're looking for ${templates[4]} or ${templates[5]}, the ${product.name} delivers exceptional value. Each unit is crafted to meet the highest standards, ensuring you get the best possible experience. Our commitment to quality means you can trust this product to perform reliably day after day.`;
    
    // Preserve user's price, only generate if not provided or if it's 0
    const basePrice = product.price && product.price > 0 ? product.price : (Math.floor(Math.random() * 200) + 50);
    
    const generatedFeatures = product.features && product.features.length > 0 
      ? product.features 
      : [
          `Premium ${templates[0]}`,
          `Features ${templates[1]}`,
          `Ensures ${templates[2]}`,
          `Provides ${templates[3]}`,
          `Guaranteed ${templates[5]}`
        ];
    
    const tags = [
      productCategory,
      'popular',
      basePrice < 100 ? 'budget-friendly' : 'premium',
      'best-seller'
    ];
    
    return {
      id: `product-${Date.now()}-${index}`,
      name: product.name,
      description: shortDesc,
      longDescription: longDesc,
      price: basePrice,
      category: productCategory,
      features: generatedFeatures,
      image: product.image || `/api/placeholder/${400 + index}/${400 + index}`,
      tags
    };
  });
  
  return {
    brandName: brandInfo.brandName,
    tagline: randomTagline,
    description: generatedDescription,
    colorScheme: randomColorScheme,
    products: generatedProducts
  };
}

export function generateProductImage(): string {
  return `https://images.unsplash.com/photo-1600000000000-0000000000?w=400&h=400&fit=crop&q=80`;
}

export function generateBrandLogo(brandName: string): string {
  return brandName.slice(0, 2).toUpperCase();
}

export function suggestProductEnhancements(products: ProductInput[]): string[] {
  const suggestions = [];
  
  if (products.length < 3) {
    suggestions.push("Consider adding more products to showcase variety");
  }
  
  if (products.some(p => !p.price)) {
    suggestions.push("Add pricing information to all products for transparency");
  }
  
  if (products.some(p => !p.category)) {
    suggestions.push("Categorize your products for better organization");
  }
  
  return suggestions;
}
