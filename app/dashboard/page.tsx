'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Store, Eye, Settings, ShoppingBag, TrendingUp, DollarSign, Sparkles, Zap } from 'lucide-react';

interface StoreData {
  id: string;
  brandName: string;
  tagline: string;
  subdomain: string;
  published: boolean;
  products?: unknown[];
  stats?: {
    views: number;
    products: number;
    revenue: number;
  };
}

export default function DashboardPage() {
  const [stores, setStores] = useState<StoreData[]>([]);

  useEffect(() => {
    const loadStores = () => {
      const tempStore = localStorage.getItem('tempStore');
      if (tempStore) {
        const parsed = JSON.parse(tempStore);
        setStores([{
          id: '1',
          ...parsed,
          stats: {
            views: Math.floor(Math.random() * 1000),
            products: parsed.products?.length || 0,
            revenue: 0
          }
        }]);
      }
    };
    loadStores();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="cyber-grid opacity-20 absolute inset-0"></div>
        <div className="gradient-mesh absolute inset-0"></div>
      </div>

      <nav className="border-b border-blue-500/20 glass-dark backdrop-blur-xl relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="h-6 w-6 text-blue-400" />
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                StoreForge AI
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-200 hover:text-blue-400 transition-colors font-medium">
                Home
              </Link>
              <Link 
                href="/builder"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Create New Store
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center glow">
              <Store className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-extrabold text-white">Dashboard</h1>
              <p className="text-gray-300 text-lg mt-1">Manage your e-commerce empire</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="glass-dark p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Store className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {stores.length}
            </div>
            <div className="text-sm text-gray-400 font-medium">Active Stores</div>
          </div>

          <div className="glass-dark p-8 rounded-2xl border border-green-500/20 hover:border-green-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {stores.reduce((sum, s) => sum + (s.stats?.views || 0), 0)}
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Views</div>
          </div>

          <div className="glass-dark p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {stores.reduce((sum, s) => sum + (s.stats?.products || 0), 0)}
            </div>
            <div className="text-sm text-gray-400 font-medium">Total Products</div>
          </div>

          <div className="glass-dark p-8 rounded-2xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="h-7 w-7 text-white" />
              </div>
            </div>
            <div className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              $0
            </div>
            <div className="text-sm text-gray-400 font-medium">Revenue (Demo)</div>
          </div>
        </div>

        <div className="glass-dark rounded-2xl shadow-2xl p-10 border border-blue-500/20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Your Stores</h2>
            </div>
            <Link
              href="/builder"
              className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all glow"
            >
              <Plus className="h-5 w-5" />
              Create New Store
            </Link>
          </div>

          {stores.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center border border-blue-500/30">
                <Store className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">No stores yet</h3>
              <p className="text-gray-300 mb-10 text-lg max-w-md mx-auto">
                Create your first AI-powered e-commerce store in minutes
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 glow"
              >
                <Sparkles className="h-6 w-6" />
                Get Started
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {stores.map((store) => (
                <div key={store.id} className="glass border border-blue-500/20 rounded-2xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all hover:border-blue-500/40 group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                        {store.brandName}
                      </h3>
                      <p className="text-base text-gray-300 mb-3">{store.tagline}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-400" />
                        {store.subdomain}.storeforge.ai
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-xs font-bold border ${
                      store.published 
                        ? 'bg-green-500/20 text-green-300 border-green-500/50' 
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50'
                    }`}>
                      {store.published ? 'Published' : 'Draft'}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-gray-700">
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                        {store.stats?.views || 0}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
                        {store.stats?.products || 0}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-1">
                        ${store.stats?.revenue || 0}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">Revenue</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/preview?store=${store.subdomain}`}
                      className="flex-1 flex items-center justify-center gap-2 px-5 py-3 glass-dark border border-blue-500/30 rounded-xl hover:border-blue-500 hover:bg-blue-500/10 transition-all font-semibold text-gray-200 hover:text-white"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-2 px-5 py-3 glass-dark border border-purple-500/30 rounded-xl hover:border-purple-500 hover:bg-purple-500/10 transition-all font-semibold text-gray-200 hover:text-white">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="glass-dark p-10 rounded-2xl border border-blue-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Quick Tips</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Add high-quality product images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Write compelling descriptions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Choose a memorable subdomain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Test your store before publishing</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="glass-dark p-10 rounded-2xl border border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center mb-6">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Need Help?</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Check out our documentation and tutorials to get the most out of StoreForge AI
              </p>
              <button className="w-full text-sm bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                View Docs
              </button>
            </div>
          </div>

          <div className="glass-dark p-10 rounded-2xl border border-green-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Upgrade Plan</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Get more stores, products, and advanced features with our premium plans
              </p>
              <button className="w-full text-sm bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-green-500/50 transition-all">
                View Plans
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
