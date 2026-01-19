import Link from 'next/link';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { themes } from '@/lib/themes';

export default function ThemesPage() {
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
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link 
                href="/builder"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Start Building
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Premium E-commerce Themes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professionally designed, conversion-optimized themes ready to launch your store
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => (
            <div key={theme.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div>
                <div className="relative z-10">
                  <div className="w-32 h-32 bg-white rounded-lg shadow-2xl flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-300">
                      {theme.name.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{theme.name}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
                    {theme.category}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{theme.description}</p>
                
                <div className="space-y-2 mb-6">
                  {theme.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/builder"
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Use This Theme
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to create your store?</h2>
          <p className="text-lg mb-8 opacity-90">
            Choose your favorite theme and launch in minutes with AI-powered content generation
          </p>
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
          >
            Start Building Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
