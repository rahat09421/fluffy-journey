import Link from 'next/link';
import { Sparkles, Zap, Palette, Globe, ShoppingBag, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StoreForge AI
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link 
                href="/builder" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              AI-Powered B2B E-commerce Platform
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Your E-commerce Store
              <br />
              in Minutes with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your business idea into a fully-functional online store. Just add your brand name 
              and products—our AI does the rest. Choose from stunning themes and launch today.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/builder"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                Start Building Free
              </Link>
              <Link 
                href="/themes"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 transition-all"
              >
                Explore Themes
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Generation</h3>
              <p className="text-gray-600">
                Our advanced AI generates compelling product descriptions, brand messaging, and 
                SEO-optimized content automatically.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Palette className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">8+ Premium Themes</h3>
              <p className="text-gray-600">
                Choose from a curated collection of beautiful, conversion-optimized themes. 
                Each fully customizable to match your brand.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-pink-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Globe className="h-7 w-7 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Publishing</h3>
              <p className="text-gray-600">
                Get your custom subdomain and go live instantly. No technical knowledge required. 
                Start selling in minutes.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl opacity-90">
                Launch your online store in 3 simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Add Your Brand</h3>
                <p className="opacity-90">
                  Enter your brand name and let AI generate your store&apos;s identity, tagline, and color scheme
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">Add Products</h3>
                <p className="opacity-90">
                  List your products with basic details. AI creates compelling descriptions and suggests improvements
                </p>
              </div>

              <div className="text-center">
                <div className="bg-white/20 backdrop-blur-sm w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Choose & Launch</h3>
                <p className="opacity-90">
                  Select your favorite theme, preview your store, and publish with one click
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Perfect for Every Business</h2>
            <p className="text-xl text-gray-600">
              Whether you&apos;re selling fashion, tech, food, or anything else
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Fashion & Apparel', icon: '👔', count: '1,234' },
              { name: 'Tech & Gadgets', icon: '💻', count: '856' },
              { name: 'Food & Beverage', icon: '🍕', count: '632' },
              { name: 'Health & Wellness', icon: '🧘', count: '445' },
              { name: 'Home & Living', icon: '🏠', count: '789' },
              { name: 'Beauty & Care', icon: '💄', count: '521' },
              { name: 'Sports & Fitness', icon: '⚽', count: '398' },
              { name: 'Art & Crafts', icon: '🎨', count: '267' }
            ].map((category) => (
              <div key={category.name} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} stores</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
              <p className="text-xl text-gray-600">
                Choose the perfect plan for your business
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: 'Free',
                  price: '$0',
                  features: ['1 Store', '10 Products', 'Basic Themes', 'Subdomain', 'Community Support']
                },
                {
                  name: 'Starter',
                  price: '$19',
                  features: ['3 Stores', '50 Products', 'All Themes', 'Custom Domain', 'Email Support', 'Analytics']
                },
                {
                  name: 'Professional',
                  price: '$49',
                  features: ['10 Stores', 'Unlimited Products', 'Premium Themes', 'Custom Domain', 'Priority Support', 'Advanced Analytics', 'API Access']
                },
                {
                  name: 'Enterprise',
                  price: '$199',
                  features: ['Unlimited Stores', 'Unlimited Products', 'Custom Themes', 'White Label', 'Dedicated Support', 'Custom Integrations', 'SLA']
                }
              ].map((plan, idx) => (
                <div 
                  key={plan.name} 
                  className={`bg-white p-8 rounded-2xl shadow-lg ${idx === 2 ? 'ring-2 ring-purple-600 scale-105' : ''}`}
                >
                  {idx === 2 && (
                    <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/builder"
                    className={`block text-center px-6 py-3 rounded-full font-semibold transition-all ${
                      idx === 2 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg' 
                        : 'border-2 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Store?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of businesses already selling online with StoreForge AI
          </p>
          <Link 
            href="/builder"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105"
          >
            Create Your Store Now
          </Link>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xl font-bold">StoreForge AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered e-commerce platform for modern businesses
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/themes">Themes</Link></li>
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 StoreForge AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
