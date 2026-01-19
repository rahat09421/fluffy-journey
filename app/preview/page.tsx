'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowLeft } from 'lucide-react';

interface StoreData {
  brandName: string;
  tagline: string;
  description: string;
  subdomain: string;
  themeId: string;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  products?: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
  }>;
  published?: boolean;
}

function PreviewContent() {
  const [store, setStore] = useState<StoreData | null>(null);

  useEffect(() => {
    const loadStore = () => {
      const tempStore = localStorage.getItem('tempStore');
      if (tempStore) {
        setStore(JSON.parse(tempStore));
      }
    };
    loadStore();
  }, []);

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your store...</p>
        </div>
      </div>
    );
  }

  const renderModernMinimal = () => (
    <div className="min-h-screen bg-white">
      <nav 
        className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm"
        style={{ borderColor: store.colorScheme.secondary }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <div 
                className="text-2xl font-bold"
                style={{ color: store.colorScheme.primary }}
              >
                {store.brandName}
              </div>
              <div className="hidden md:flex gap-6">
                <a href="#products" className="text-gray-600 hover:text-gray-900">Products</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Heart className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section 
        className="py-20 text-center"
        style={{ backgroundColor: store.colorScheme.secondary }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {store.description}
          </p>
          <button 
            className="px-8 py-4 rounded-full text-white font-semibold hover:shadow-lg transition-all"
            style={{ backgroundColor: store.colorScheme.primary }}
          >
            Shop Now
          </button>
        </div>
      </section>

      <section id="products" className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {store.products?.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform">
                  <span className="text-6xl">{product.category === 'fashion' ? '👔' : product.category === 'tech' ? '💻' : '📦'}</span>
                </div>
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span 
                  className="text-xl font-bold"
                  style={{ color: store.colorScheme.accent }}
                >
                  ${product.price}
                </span>
                <button 
                  className="px-4 py-2 rounded-full text-sm font-semibold text-white hover:shadow-lg transition-all"
                  style={{ backgroundColor: store.colorScheme.primary }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer 
        className="py-12 mt-20"
        style={{ backgroundColor: store.colorScheme.primary, color: 'white' }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xl font-bold mb-2">{store.brandName}</p>
          <p className="opacity-80">© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );

  const renderBoldVibrant = () => (
    <div className="min-h-screen" style={{ backgroundColor: store.colorScheme.background }}>
      <nav 
        className="py-4"
        style={{ backgroundColor: store.colorScheme.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-3xl font-black text-white transform -skew-x-6">
            {store.brandName}
          </div>
          <div className="flex gap-6 text-white font-bold">
            <a href="#products" className="hover:underline">PRODUCTS</a>
            <a href="#about" className="hover:underline">ABOUT</a>
            <button className="bg-white text-black px-6 py-2 rounded-full font-black transform hover:scale-105 transition-transform">
              SHOP
            </button>
          </div>
        </div>
      </nav>

      <section className="py-24 text-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, ${store.colorScheme.accent} 0px, ${store.colorScheme.accent} 10px, transparent 10px, transparent 20px)`
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 
            className="text-6xl md:text-7xl font-black mb-6 transform -skew-y-2"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline.toUpperCase()}
          </h1>
          <p className="text-2xl font-bold mb-8" style={{ color: store.colorScheme.text }}>
            {store.description}
          </p>
          <button 
            className="px-12 py-6 rounded-full text-white text-xl font-black transform hover:scale-110 transition-all shadow-2xl"
            style={{ backgroundColor: store.colorScheme.accent }}
          >
            EXPLORE NOW
          </button>
        </div>
      </section>

      <section id="products" className="py-16 max-w-7xl mx-auto px-4">
        <h2 
          className="text-5xl font-black text-center mb-12 transform -skew-x-6"
          style={{ color: store.colorScheme.primary }}
        >
          FEATURED PRODUCTS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {store.products?.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl p-6 transform hover:scale-105 transition-all shadow-lg"
              style={{ backgroundColor: 'white' }}
            >
              <div 
                className="aspect-square rounded-xl mb-4 flex items-center justify-center text-7xl"
                style={{ backgroundColor: store.colorScheme.secondary }}
              >
                {product.category === 'fashion' ? '👔' : product.category === 'tech' ? '💻' : '📦'}
              </div>
              <h3 className="font-black text-xl mb-2">{product.name.toUpperCase()}</h3>
              <p className="text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span 
                  className="text-3xl font-black"
                  style={{ color: store.colorScheme.accent }}
                >
                  ${product.price}
                </span>
                <button 
                  className="px-6 py-3 rounded-full font-black text-white shadow-lg hover:shadow-xl transition-all"
                  style={{ backgroundColor: store.colorScheme.primary }}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderClassicElegant = () => (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div 
              className="text-3xl font-serif tracking-wider"
              style={{ color: store.colorScheme.primary }}
            >
              {store.brandName}
            </div>
            <div className="flex gap-8 text-sm tracking-wider uppercase">
              <a href="#collection" className="text-gray-600 hover:text-gray-900">Collection</a>
              <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-32 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <div 
            className="w-1 h-16 mx-auto mb-8"
            style={{ backgroundColor: store.colorScheme.accent }}
          />
          <h1 
            className="text-5xl font-serif mb-6 tracking-wide"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-8 font-serif italic">
            {store.description}
          </p>
          <button 
            className="px-10 py-4 border-2 font-serif tracking-wider hover:bg-black hover:text-white transition-all"
            style={{ borderColor: store.colorScheme.primary, color: store.colorScheme.primary }}
          >
            Discover Collection
          </button>
        </div>
      </section>

      <section id="collection" className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-16 tracking-wide">
          Featured Collection
        </h2>
        <div className="grid md:grid-cols-2 gap-16">
          {store.products?.map((product) => (
            <div key={product.id} className="group">
              <div className="aspect-[3/4] bg-gray-50 mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-110 transition-transform duration-500">
                  {product.category === 'fashion' ? '👔' : product.category === 'tech' ? '💻' : '📦'}
                </div>
              </div>
              <h3 className="font-serif text-2xl mb-3 tracking-wide">{product.name}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <span 
                  className="text-2xl font-serif"
                  style={{ color: store.colorScheme.accent }}
                >
                  ${product.price}
                </span>
                <button 
                  className="px-6 py-3 border font-serif tracking-wider hover:bg-black hover:text-white transition-all"
                  style={{ borderColor: store.colorScheme.primary }}
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 py-12 mt-32">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-2xl mb-2 tracking-wider">{store.brandName}</p>
          <p className="text-gray-600 text-sm tracking-wider">ESTABLISHED 2024</p>
        </div>
      </footer>
    </div>
  );

  const themeRenderers: Record<string, () => React.JSX.Element> = {
    'modern-minimal': renderModernMinimal,
    'bold-vibrant': renderBoldVibrant,
    'classic-elegant': renderClassicElegant,
    'tech-modern': renderModernMinimal,
    'boutique-chic': renderModernMinimal,
    'minimal-zen': renderModernMinimal,
    'urban-edge': renderBoldVibrant,
    'organic-natural': renderClassicElegant,
  };

  const renderTheme = themeRenderers[store.themeId] || renderModernMinimal;

  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => {
            const currentStore = localStorage.getItem('tempStore');
            if (currentStore) {
              const parsed = JSON.parse(currentStore);
              parsed.published = true;
              localStorage.setItem('tempStore', JSON.stringify(parsed));
              alert('Store published successfully! 🎉');
            }
          }}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-semibold"
        >
          Publish Store
        </button>
      </div>

      {renderTheme()}
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
