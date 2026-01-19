'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Store, Eye, Settings, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">StoreForge AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link 
                href="/builder"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Create New Store
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your e-commerce stores</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Store className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">{stores.length}</div>
            <div className="text-sm text-gray-600">Active Stores</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              {stores.reduce((sum, s) => sum + (s.stats?.views || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">
              {stores.reduce((sum, s) => sum + (s.stats?.products || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="text-3xl font-bold mb-1">$0</div>
            <div className="text-sm text-gray-600">Revenue (Demo)</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Your Stores</h2>
            <Link
              href="/builder"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              Create New Store
            </Link>
          </div>

          {stores.length === 0 ? (
            <div className="text-center py-16">
              <Store className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No stores yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first AI-powered e-commerce store in minutes
              </p>
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
              >
                <Plus className="h-5 w-5" />
                Get Started
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {stores.map((store) => (
                <div key={store.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{store.brandName}</h3>
                      <p className="text-sm text-gray-600">{store.tagline}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {store.subdomain}.storeforge.ai
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      store.published 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {store.published ? 'Published' : 'Draft'}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{store.stats?.views || 0}</div>
                      <div className="text-xs text-gray-600">Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{store.stats?.products || 0}</div>
                      <div className="text-xs text-gray-600">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">${store.stats?.revenue || 0}</div>
                      <div className="text-xs text-gray-600">Revenue</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/preview?store=${store.subdomain}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </Link>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Quick Tips</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>• Add high-quality product images</li>
              <li>• Write compelling descriptions</li>
              <li>• Choose a memorable subdomain</li>
              <li>• Test your store before publishing</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-sm opacity-90 mb-4">
              Check out our documentation and tutorials to get the most out of StoreForge AI
            </p>
            <button className="text-sm bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              View Docs
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-2">Upgrade Plan</h3>
            <p className="text-sm opacity-90 mb-4">
              Get more stores, products, and advanced features with our premium plans
            </p>
            <button className="text-sm bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              View Plans
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
