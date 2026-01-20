'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, ArrowLeft, Star } from 'lucide-react';
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
        setStore(JSON.parse(tempStore));
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <nav 
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-gray-200 bg-white/80"
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
                <a href="#products" className="text-gray-700 hover:text-gray-900 font-medium">Products</a>
                <a href="#about" className="text-gray-700 hover:text-gray-900 font-medium">About</a>
                <a href="#contact" className="text-gray-700 hover:text-gray-900 font-medium">Contact</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section 
        className="py-24 text-center bg-white"
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: store.colorScheme.primary }}
          >
            {store.tagline}
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {store.description}
          </p>
          <button 
            className="px-10 py-4 rounded-full text-white font-semibold hover:shadow-xl transition-all transform hover:scale-105"
            style={{ backgroundColor: store.colorScheme.primary }}
          >
            Shop Now
          </button>
        </div>
      </section>

      <section id="products" className="py-20 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Products</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {store.products?.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl overflow-hidden relative">
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl group-hover:scale-110 transition-transform">
                    {product.category === 'fashion' || product.category === 'Fashion & Apparel' ? '👔' : 
                     product.category === 'tech' || product.category === 'Tech & Gadgets' ? '💻' : 
                     product.category === 'food' ? '🍕' : '📦'}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">(12)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: store.colorScheme.accent }}
                  >
                    ${product.price}
                  </span>
                  <button 
                    className="px-6 py-3 rounded-full text-sm font-semibold text-white hover:shadow-lg transition-all transform hover:scale-105"
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

      <footer 
        className="py-16 mt-24 text-white"
        style={{ backgroundColor: store.colorScheme.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-2xl font-bold mb-2">{store.brandName}</p>
          <p className="opacity-90">© 2024 All rights reserved. Powered by StoreForge AI</p>
        </div>
      </footer>
    </div>
  );

  const renderBoldVibrant = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <nav 
        className="py-4 shadow-lg"
        style={{ backgroundColor: store.colorScheme.primary }}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-3xl font-black text-white transform -skew-x-6">
            {store.brandName}
          </div>
          <div className="flex gap-6 text-white font-bold">
            <a href="#products" className="hover:underline">PRODUCTS</a>
            <a href="#about" className="hover:underline">ABOUT</a>
            <button className="bg-white px-6 py-2 rounded-full font-black transform hover:scale-110 transition-transform shadow-lg" style={{ color: store.colorScheme.primary }}>
              SHOP
            </button>
          </div>
        </div>
      </nav>

      <section className="py-28 text-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-5"
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
          <p className="text-2xl font-bold mb-10 text-gray-800">
            {store.description}
          </p>
          <button 
            className="px-14 py-6 rounded-full text-white text-xl font-black transform hover:scale-110 transition-all shadow-2xl"
            style={{ backgroundColor: store.colorScheme.accent }}
          >
            EXPLORE NOW
          </button>
        </div>
      </section>

      <section id="products" className="py-20 max-w-7xl mx-auto px-4">
        <h2 
          className="text-5xl font-black text-center mb-16 transform -skew-x-6"
          style={{ color: store.colorScheme.primary }}
        >
          FEATURED PRODUCTS
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {store.products?.map((product) => (
            <div 
              key={product.id} 
              className="rounded-2xl p-6 transform hover:scale-105 transition-all shadow-2xl bg-white"
            >
              <div 
                className="aspect-square rounded-xl mb-6 flex items-center justify-center text-8xl overflow-hidden relative"
                style={{ backgroundColor: store.colorScheme.secondary }}
              >
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>{product.category === 'fashion' || product.category === 'Fashion & Apparel' ? '👔' : 
                    product.category === 'tech' || product.category === 'Tech & Gadgets' ? '💻' : 
                    product.category === 'food' ? '🍕' : '📦'}</>
                )}
              </div>
              <h3 className="font-black text-xl mb-3 text-gray-900">{product.name.toUpperCase()}</h3>
              <p className="text-sm mb-6 text-gray-700">{product.description}</p>
              <div className="flex items-center justify-between">
                <span 
                  className="text-4xl font-black"
                  style={{ color: store.colorScheme.accent }}
                >
                  ${product.price}
                </span>
                <button 
                  className="px-8 py-4 rounded-full font-black text-white shadow-xl hover:shadow-2xl transition-all"
                  style={{ backgroundColor: store.colorScheme.primary }}
                >
                  BUY NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-16 mt-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-3xl font-black mb-2 transform -skew-x-6">{store.brandName}</p>
          <p className="opacity-80">© 2024 All rights reserved</p>
        </div>
      </footer>
    </div>
  );

  const renderClassicElegant = () => (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-stone-100">
      <nav className="border-b border-gray-300 bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div 
              className="text-3xl font-serif tracking-wider"
              style={{ color: store.colorScheme.primary }}
            >
              {store.brandName}
            </div>
            <div className="flex gap-10 text-sm tracking-widest uppercase font-semibold">
              <a href="#collection" className="text-gray-700 hover:text-gray-900 transition-colors">Collection</a>
              <a href="#about" className="text-gray-700 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="py-36 text-center bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div 
            className="w-1 h-20 mx-auto mb-10"
            style={{ backgroundColor: store.colorScheme.accent }}
          />
          <h1 
            className="text-5xl md:text-6xl font-serif mb-8 tracking-wide text-gray-900"
          >
            {store.tagline}
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-12 font-serif italic max-w-2xl mx-auto">
            {store.description}
          </p>
          <button 
            className="px-12 py-4 border-2 font-serif tracking-wider hover:bg-gray-900 hover:text-white transition-all text-gray-900"
            style={{ borderColor: store.colorScheme.primary }}
          >
            Discover Collection
          </button>
        </div>
      </section>

      <section id="collection" className="py-20 max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-serif text-center mb-20 tracking-wide text-gray-900">
          Featured Collection
        </h2>
        <div className="grid md:grid-cols-2 gap-16">
          {store.products?.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[3/4] bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden relative">
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-9xl group-hover:scale-110 transition-transform duration-700">
                    {product.category === 'fashion' || product.category === 'Fashion & Apparel' ? '👔' : 
                     product.category === 'tech' || product.category === 'Tech & Gadgets' ? '💻' : 
                     product.category === 'food' ? '🍕' : '📦'}
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl mb-4 tracking-wide text-gray-900">{product.name}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <span 
                    className="text-3xl font-serif"
                    style={{ color: store.colorScheme.accent }}
                  >
                    ${product.price}
                  </span>
                  <button 
                    className="px-8 py-3 border-2 font-serif tracking-wider hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all text-gray-900"
                    style={{ borderColor: store.colorScheme.primary }}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-300 py-16 mt-32 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-serif text-2xl mb-3 tracking-widest text-gray-900">{store.brandName}</p>
          <p className="text-gray-600 text-sm tracking-widest">ESTABLISHED 2024</p>
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
