'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowLeft, Star, Menu } from 'lucide-react';
import Image from 'next/image';

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
    image?: string;
  }>;
  published?: boolean;
}

function PreviewContent() {
  const [store, setStore] = useState<StoreData | null>(null);

  useEffect(() => {
    const loadStore = () => {
      const tempStore = localStorage.getItem('tempStore');
      if (tempStore) {
        const parsed = JSON.parse(tempStore);
        console.log('Loaded store:', parsed);
        setStore(parsed);
      }
    };
    loadStore();
  }, []);

  if (!store) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your store...</p>
        </div>
      </div>
    );
  }

  const renderModernMinimal = () => (
    <div className="min-h-screen" style={{ backgroundColor: store.colorScheme.background }}>
      {/* Navigation */}
      <nav 
        className="sticky top-0 z-50 backdrop-blur-xl border-b shadow-sm"
        style={{ 
          borderColor: store.colorScheme.secondary,
          backgroundColor: `${store.colorScheme.background}f0`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-8">
              <div 
                className="text-3xl font-bold tracking-tight"
                style={{ color: store.colorScheme.primary }}
              >
                {store.brandName}
              </div>
              <div className="hidden md:flex gap-8">
                <a href="#products" className="text-base font-medium hover:opacity-70 transition-opacity" style={{ color: store.colorScheme.text }}>Products</a>
                <a href="#about" className="text-base font-medium hover:opacity-70 transition-opacity" style={{ color: store.colorScheme.text }}>About</a>
                <a href="#contact" className="text-base font-medium hover:opacity-70 transition-opacity" style={{ color: store.colorScheme.text }}>Contact</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 rounded-full hover:bg-black/5 transition-colors">
                <Heart className="h-6 w-6" style={{ color: store.colorScheme.text }} />
              </button>
              <button className="p-3 rounded-full hover:bg-black/5 transition-colors relative">
                <ShoppingCart className="h-6 w-6" style={{ color: store.colorScheme.text }} />
                <span className="absolute -top-1 -right-1 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold" style={{ backgroundColor: store.colorScheme.accent }}>
                  0
                </span>
              </button>
              <button className="md:hidden p-3">
                <Menu className="h-6 w-6" style={{ color: store.colorScheme.text }} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        className="py-32 text-center relative overflow-hidden"
        style={{ backgroundColor: store.colorScheme.secondary }}
      >
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, ${store.colorScheme.primary} 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h1 
            className="text-6xl md:text-7xl font-black mb-8 leading-tight"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline}
          </h1>
          <p className="text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium" style={{ color: store.colorScheme.text }}>
            {store.description}
          </p>
          <button 
            className="px-12 py-5 rounded-full text-white text-lg font-bold hover:shadow-2xl transition-all transform hover:scale-105 shadow-xl"
            style={{ backgroundColor: store.colorScheme.primary }}
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-black text-center mb-20" style={{ color: store.colorScheme.primary }}>
          Our Products
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {store.products?.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all overflow-hidden">
              <div className="aspect-square overflow-hidden relative" style={{ backgroundColor: store.colorScheme.secondary }}>
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl group-hover:scale-110 transition-transform">
                    {product.category?.toLowerCase().includes('fashion') || product.category?.toLowerCase().includes('apparel') ? '👔' : 
                     product.category?.toLowerCase().includes('tech') || product.category?.toLowerCase().includes('gadget') ? '💻' : 
                     product.category?.toLowerCase().includes('food') ? '🍕' : '📦'}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-bold text-2xl mb-3" style={{ color: store.colorScheme.text }}>{product.name}</h3>
                <p className="text-base mb-6 line-clamp-2 leading-relaxed" style={{ color: `${store.colorScheme.text}99` }}>{product.description}</p>
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-3 text-sm font-medium" style={{ color: store.colorScheme.text }}>(24 reviews)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-4xl font-black"
                    style={{ color: store.colorScheme.accent }}
                  >
                    ${product.price}
                  </span>
                  <button 
                    className="px-8 py-4 rounded-full text-white text-base font-bold hover:shadow-xl transition-all transform hover:scale-105"
                    style={{ backgroundColor: store.colorScheme.primary }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-20 mt-32 text-white"
        style={{ backgroundColor: store.colorScheme.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-3xl font-bold mb-3">{store.brandName}</p>
          <p className="opacity-90 text-lg">© 2024 All rights reserved. Powered by StoreForge AI</p>
        </div>
      </footer>
    </div>
  );

  const renderBoldVibrant = () => (
    <div className="min-h-screen" style={{ backgroundColor: store.colorScheme.background }}>
      {/* Navigation */}
      <nav 
        className="py-6 shadow-2xl"
        style={{ backgroundColor: store.colorScheme.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-4xl font-black text-white transform -skew-x-6">
            {store.brandName}
          </div>
          <div className="flex gap-8 text-white font-bold text-lg">
            <a href="#products" className="hover:underline decoration-4 underline-offset-8">PRODUCTS</a>
            <a href="#about" className="hover:underline decoration-4 underline-offset-8">ABOUT</a>
            <button className="bg-white px-8 py-3 rounded-full font-black transform hover:scale-110 transition-transform shadow-2xl" style={{ color: store.colorScheme.primary }}>
              SHOP NOW
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-36 text-center relative overflow-hidden" style={{ backgroundColor: store.colorScheme.secondary }}>
        <div 
          className="absolute inset-0 opacity-10"
          style={{ 
            backgroundImage: `repeating-linear-gradient(45deg, ${store.colorScheme.accent} 0px, ${store.colorScheme.accent} 20px, transparent 20px, transparent 40px)`
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <h1 
            className="text-7xl md:text-8xl font-black mb-8 transform -skew-y-3 leading-tight"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline.toUpperCase()}
          </h1>
          <p className="text-3xl font-bold mb-12" style={{ color: store.colorScheme.text }}>
            {store.description}
          </p>
          <button 
            className="px-16 py-7 rounded-full text-white text-2xl font-black transform hover:scale-110 transition-all shadow-2xl"
            style={{ backgroundColor: store.colorScheme.accent }}
          >
            EXPLORE NOW
          </button>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-24 max-w-7xl mx-auto px-4">
        <h2 
          className="text-6xl font-black text-center mb-20 transform -skew-x-6"
          style={{ color: store.colorScheme.primary }}
        >
          FEATURED PRODUCTS
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {store.products?.map((product) => (
            <div 
              key={product.id} 
              className="rounded-3xl p-8 transform hover:scale-105 transition-all shadow-2xl bg-white"
            >
              <div 
                className="aspect-square rounded-2xl mb-8 flex items-center justify-center text-9xl overflow-hidden relative shadow-xl"
                style={{ backgroundColor: store.colorScheme.secondary }}
              >
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <>{product.category?.toLowerCase().includes('fashion') || product.category?.toLowerCase().includes('apparel') ? '👔' : 
                    product.category?.toLowerCase().includes('tech') || product.category?.toLowerCase().includes('gadget') ? '💻' : 
                    product.category?.toLowerCase().includes('food') ? '🍕' : '📦'}</>
                )}
              </div>
              <h3 className="font-black text-2xl mb-4" style={{ color: store.colorScheme.text }}>{product.name.toUpperCase()}</h3>
              <p className="text-base mb-8 leading-relaxed" style={{ color: `${store.colorScheme.text}dd` }}>{product.description}</p>
              <div className="flex items-center justify-between">
                <span 
                  className="text-5xl font-black"
                  style={{ color: store.colorScheme.accent }}
                >
                  ${product.price}
                </span>
                <button 
                  className="px-10 py-5 rounded-full font-black text-white shadow-2xl hover:shadow-3xl transition-all text-lg"
                  style={{ backgroundColor: store.colorScheme.primary }}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 mt-32" style={{ backgroundColor: store.colorScheme.primary }}>
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <p className="text-4xl font-black mb-3 transform -skew-x-6">{store.brandName}</p>
          <p className="opacity-90 text-lg">© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );

  const renderClassicElegant = () => (
    <div className="min-h-screen" style={{ backgroundColor: store.colorScheme.background }}>
      {/* Navigation */}
      <nav className="border-b backdrop-blur-sm" style={{ borderColor: `${store.colorScheme.text}20` }}>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <div 
              className="text-4xl font-serif tracking-widest"
              style={{ color: store.colorScheme.primary }}
            >
              {store.brandName}
            </div>
            <div className="flex gap-12 text-base tracking-widest uppercase font-semibold">
              <a href="#collection" className="hover:opacity-70 transition-opacity" style={{ color: store.colorScheme.text }}>Collection</a>
              <a href="#about" className="hover:opacity-70 transition-opacity" style={{ color: store.colorScheme.text }}>About</a>
              <a href="#contact" className="hover:opacity-70 transition-opacity" style={{ color: store.colorScheme.text }}>Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-40 text-center" style={{ backgroundColor: store.colorScheme.secondary }}>
        <div className="max-w-4xl mx-auto px-4">
          <div 
            className="w-1 h-24 mx-auto mb-12"
            style={{ backgroundColor: store.colorScheme.accent }}
          />
          <h1 
            className="text-6xl md:text-7xl font-serif mb-10 tracking-wide leading-tight"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline}
          </h1>
          <p className="text-2xl leading-relaxed mb-16 font-serif italic max-w-3xl mx-auto" style={{ color: store.colorScheme.text }}>
            {store.description}
          </p>
          <button 
            className="px-16 py-5 border-2 font-serif tracking-widest hover:bg-opacity-100 transition-all text-lg font-semibold"
            style={{ 
              borderColor: store.colorScheme.primary,
              color: store.colorScheme.primary,
              backgroundColor: 'transparent'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = store.colorScheme.primary;
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = store.colorScheme.primary;
            }}
          >
            Discover Collection
          </button>
        </div>
      </section>

      {/* Products */}
      <section id="collection" className="py-24 max-w-6xl mx-auto px-4">
        <h2 className="text-5xl font-serif text-center mb-24 tracking-wide" style={{ color: store.colorScheme.primary }}>
          Featured Collection
        </h2>
        <div className="grid md:grid-cols-2 gap-20">
          {store.products?.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden relative" style={{ backgroundColor: store.colorScheme.secondary }}>
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-1000" style={{ fontSize: '10rem' }}>
                    {product.category?.toLowerCase().includes('fashion') || product.category?.toLowerCase().includes('apparel') ? '👔' : 
                     product.category?.toLowerCase().includes('tech') || product.category?.toLowerCase().includes('gadget') ? '💻' : 
                     product.category?.toLowerCase().includes('food') ? '🍕' : '📦'}
                  </div>
                )}
              </div>
              <div className="p-10">
                <h3 className="font-serif text-3xl mb-5 tracking-wide" style={{ color: store.colorScheme.text }}>{product.name}</h3>
                <p className="text-lg mb-8 leading-relaxed" style={{ color: `${store.colorScheme.text}cc` }}>{product.description}</p>
                <div className="flex items-center justify-between border-t pt-8" style={{ borderColor: `${store.colorScheme.text}20` }}>
                  <span 
                    className="text-4xl font-serif"
                    style={{ color: store.colorScheme.accent }}
                  >
                    ${product.price}
                  </span>
                  <button 
                    className="px-10 py-4 border-2 font-serif tracking-wider transition-all text-base font-semibold"
                    style={{ 
                      borderColor: store.colorScheme.primary,
                      color: store.colorScheme.primary,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = store.colorScheme.primary;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = store.colorScheme.primary;
                    }}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-20 mt-40" style={{ borderColor: `${store.colorScheme.text}20`, backgroundColor: store.colorScheme.secondary }}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-3xl mb-4 tracking-widest" style={{ color: store.colorScheme.primary }}>{store.brandName}</p>
          <p className="text-sm tracking-widest" style={{ color: store.colorScheme.text }}>ESTABLISHED 2024</p>
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
    'luxury-premium': renderClassicElegant,
    'neon-cyber': renderBoldVibrant,
    'soft-pastel': renderModernMinimal,
    'vintage-retro': renderClassicElegant,
    'corporate-pro': renderModernMinimal,
    'artistic-creative': renderBoldVibrant,
    'minimalist-mono': renderModernMinimal,
    'gradient-modern': renderModernMinimal,
  };

  const renderTheme = themeRenderers[store.themeId] || renderModernMinimal;

  return (
    <div>
      <div className="fixed top-4 left-4 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 glass-dark border border-blue-500/30 px-5 py-3 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all text-white font-semibold"
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
              alert('Store published successfully! 🎉\n\nYour store is now live at: ' + parsed.subdomain + '.storeforge.ai');
            }
          }}
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all font-bold glow-green"
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading preview...</p>
        </div>
      </div>
    }>
      <PreviewContent />
    </Suspense>
  );
}
