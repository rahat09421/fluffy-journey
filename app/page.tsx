import Link from 'next/link';
import { Sparkles, Zap, Palette, Globe, ShoppingBag, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="cyber-grid opacity-30 absolute inset-0"></div>
        <div className="gradient-mesh absolute inset-0"></div>
      </div>

      <nav className="border-b border-blue-500/20 glass-dark sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBag className="h-8 w-8 text-blue-400" />
                <div className="absolute inset-0 bg-blue-500 blur-lg opacity-50"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                StoreForge AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-gray-200 hover:text-blue-400 transition-colors font-medium"
              >
                Dashboard
              </Link>
              <Link 
                href="/builder" 
                className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold overflow-hidden transition-all hover:shadow-lg hover:shadow-blue-500/50"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-blue-500/30 glow">
              <Sparkles className="h-5 w-5 text-blue-400" />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AI-Powered B2B E-commerce Platform
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create Your E-commerce Store
              </span>
              <br />
              <span className="text-white text-5xl md:text-6xl">in Minutes with AI</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your business idea into a fully-functional online store. Just add your brand name 
              and products—our AI does the rest. Choose from stunning themes and launch today.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/builder"
                className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  Start Building Free
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
              </Link>
              <Link 
                href="/themes"
                className="glass border-2 border-blue-500/50 text-white px-10 py-4 rounded-full text-lg font-bold hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                Explore Themes
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-24">
            <div className="glass-dark p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all hover:shadow-xl hover:shadow-blue-500/20 group">
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">AI-Powered Generation</h3>
              <p className="text-gray-300 leading-relaxed">
                Our advanced AI generates compelling product descriptions, brand messaging, and 
                SEO-optimized content automatically.
              </p>
            </div>

            <div className="glass-dark p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-xl hover:shadow-purple-500/20 group">
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform glow-purple">
                <Palette className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">8+ Premium Themes</h3>
              <p className="text-gray-300 leading-relaxed">
                Choose from a curated collection of beautiful, conversion-optimized themes. 
                Each fully customizable to match your brand.
              </p>
            </div>

            <div className="glass-dark p-8 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all hover:shadow-xl hover:shadow-pink-500/20 group">
              <div className="bg-gradient-to-br from-pink-600 to-pink-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Instant Publishing</h3>
              <p className="text-gray-300 leading-relaxed">
                Get your custom subdomain and go live instantly. No technical knowledge required. 
                Start selling in minutes.
              </p>
            </div>
          </div>
        </section>

        <section className="relative py-24 mt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute inset-0 cyber-grid opacity-20"></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold mb-6 text-white">How It Works</h2>
              <p className="text-2xl text-gray-300">
                Launch your online store in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="glass-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black border-2 border-blue-500/50 text-white group-hover:scale-110 transition-transform glow">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Add Your Brand</h3>
                <p className="text-gray-300 leading-relaxed">
                  Enter your brand name and let AI generate your store&apos;s identity, tagline, and color scheme
                </p>
              </div>

              <div className="text-center group">
                <div className="glass-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black border-2 border-purple-500/50 text-white group-hover:scale-110 transition-transform glow-purple">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Add Products</h3>
                <p className="text-gray-300 leading-relaxed">
                  List your products with basic details. AI creates compelling descriptions and suggests improvements
                </p>
              </div>

              <div className="text-center group">
                <div className="glass-dark w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black border-2 border-pink-500/50 text-white group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Choose & Launch</h3>
                <p className="text-gray-300 leading-relaxed">
                  Select your favorite theme, preview your store, and publish with one click
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-6 text-white">Perfect for Every Business</h2>
            <p className="text-2xl text-gray-300">
              Whether you&apos;re selling fashion, tech, food, or anything else
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Fashion & Apparel', icon: '👔', count: '1,234', color: 'blue' },
              { name: 'Tech & Gadgets', icon: '💻', count: '856', color: 'purple' },
              { name: 'Food & Beverage', icon: '🍕', count: '632', color: 'pink' },
              { name: 'Health & Wellness', icon: '🧘', count: '445', color: 'green' },
              { name: 'Home & Living', icon: '🏠', count: '789', color: 'yellow' },
              { name: 'Beauty & Care', icon: '💄', count: '521', color: 'red' },
              { name: 'Sports & Fitness', icon: '⚽', count: '398', color: 'cyan' },
              { name: 'Art & Crafts', icon: '🎨', count: '267', color: 'orange' }
            ].map((category) => (
              <div key={category.name} className="glass-dark p-8 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/20 transition-all text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-white">{category.name}</h3>
                <p className="text-sm text-gray-400">{category.count} stores</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-dark py-24 border-y border-blue-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold mb-6 text-white">Pricing Plans</h2>
              <p className="text-2xl text-gray-300">
                Choose the perfect plan for your business
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  features: ['1 Store', '10 Products', 'Basic Themes', 'Subdomain', 'Community Support'],
                  popular: false
                },
                {
                  name: 'Starter',
                  price: '$19',
                  features: ['3 Stores', '50 Products', 'All Themes', 'Custom Domain', 'Email Support', 'Analytics'],
                  popular: false
                },
                {
                  name: 'Professional',
                  price: '$49',
                  features: ['10 Stores', 'Unlimited Products', 'Premium Themes', 'Custom Domain', 'Priority Support', 'Advanced Analytics', 'API Access'],
                  popular: true
                },
                {
                  name: 'Enterprise',
                  price: '$199',
                  features: ['Unlimited Stores', 'Unlimited Products', 'Custom Themes', 'White Label', 'Dedicated Support', 'Custom Integrations', 'SLA'],
                  popular: false
                }
              ].map((plan) => (
                <div 
                  key={plan.name} 
                  className={`glass-dark p-8 rounded-2xl border transition-all ${
                    plan.popular 
                      ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105 shadow-2xl shadow-blue-500/30' 
                      : 'border-blue-500/20 hover:border-blue-500/40'
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-4 py-2 rounded-full inline-block mb-4 glow">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-3 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{plan.price}</span>
                    <span className="text-gray-400 text-lg">/month</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <TrendingUp className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/builder"
                    className={`block text-center px-6 py-3.5 rounded-full font-bold transition-all ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 glow' 
                        : 'glass border-2 border-blue-500/50 text-white hover:border-blue-400'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h2 className="text-5xl font-extrabold mb-8 text-white">Ready to Launch Your Store?</h2>
          <p className="text-2xl text-gray-300 mb-10 leading-relaxed">
            Join thousands of businesses already selling online with StoreForge AI
          </p>
          <Link 
            href="/builder"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-14 py-5 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105 glow"
          >
            <Sparkles className="h-6 w-6" />
            Create Your Store Now
          </Link>
        </section>
      </main>

      <footer className="glass-dark border-t border-blue-500/20 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="h-8 w-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  StoreForge AI
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                AI-powered e-commerce platform for modern businesses
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/themes" className="text-gray-400 hover:text-blue-400 transition-colors">Themes</Link></li>
                <li><Link href="/features" className="text-gray-400 hover:text-blue-400 transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white text-lg">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-500/20 mt-12 pt-8 text-center text-sm text-gray-400">
            © 2024 StoreForge AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
