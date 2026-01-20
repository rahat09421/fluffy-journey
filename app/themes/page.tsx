import Link from 'next/link';
import { ArrowRight, Check, ShoppingBag, Sparkles } from 'lucide-react';
import { themes } from '@/lib/themes';

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated background */}
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
              <Link href="/dashboard" className="text-gray-200 hover:text-blue-400 transition-colors font-medium">
                Dashboard
              </Link>
              <Link 
                href="/builder"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Start Building
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-purple-500/30 glow-purple">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              8+ Professional Themes
            </span>
          </div>
          <h1 className="text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Premium E-commerce Themes
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professionally designed, conversion-optimized themes ready to launch your store
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {themes.map((theme) => (
            <div key={theme.id} className="glass-dark rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/20 transition-all group">
              <div className="h-56 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="glass w-40 h-40 rounded-2xl shadow-2xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform">
                    <span className="text-6xl font-black bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {theme.name.split(' ').map(w => w[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  theme.category === 'modern' ? 'bg-blue-500/20 border-blue-500/50 text-blue-300' :
                  theme.category === 'minimal' ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' :
                  theme.category === 'bold' ? 'bg-pink-500/20 border-pink-500/50 text-pink-300' :
                  'bg-green-500/20 border-green-500/50 text-green-300'
                }`}>
                  {theme.category.toUpperCase()}
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3">{theme.name}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{theme.description}</p>
                
                <div className="space-y-3 mb-8">
                  {theme.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link
                  href="/builder"
                  className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all group-hover:scale-105"
                >
                  Use This Theme
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-dark rounded-3xl p-16 text-center border border-blue-500/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-6 text-white">Ready to create your store?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Choose your favorite theme and launch in minutes with AI-powered content generation
            </p>
            <Link
              href="/builder"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-12 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 glow"
            >
              <Sparkles className="h-6 w-6" />
              Start Building Now
              <ArrowRight className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
