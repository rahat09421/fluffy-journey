'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles, Plus, Trash2, ShoppingBag, Zap, Upload, X } from 'lucide-react';
import { generateStoreContent, type ProductInput, type BrandInfo } from '@/lib/ai-generator';
import Image from 'next/image';

type Step = 1 | 2 | 3 | 4;

interface ProductInputWithImage extends ProductInput {
  image?: string;
}

export default function BuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [products, setProducts] = useState<ProductInputWithImage[]>([
    { name: '', category: '', price: 0, features: [], image: '' }
  ]);
  const [generatedStore, setGeneratedStore] = useState<ReturnType<typeof generateStoreContent> | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('modern-minimal');
  const [subdomain, setSubdomain] = useState('');

  const addProduct = () => {
    setProducts([...products, { name: '', category: '', price: 0, features: [], image: '' }]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof ProductInputWithImage, value: string | number | string[]) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProduct(index, 'image', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    updateProduct(index, 'image', '');
  };

  const handleGenerate = () => {
    const brandInfo: BrandInfo = {
      brandName,
      industry,
      description: brandDescription
    };

    const validProducts = products.filter(p => p.name.trim() !== '');
    const generated = generateStoreContent(brandInfo, validProducts);
    setGeneratedStore(generated);
    setSubdomain(brandName.toLowerCase().replace(/[^a-z0-9]/g, '-'));
  };

  // Auto-generate store content when moving to step 3
  useEffect(() => {
    if (currentStep === 3 && !generatedStore) {
      handleGenerate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);


  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handlePublish = () => {
    if (!generatedStore) {
      alert('Please complete all previous steps first!');
      return;
    }

    // Clean and prepare the store data
    const storeData = {
      brandName: generatedStore.brandName,
      tagline: generatedStore.tagline,
      description: generatedStore.description,
      colorScheme: generatedStore.colorScheme,
      products: generatedStore.products,
      subdomain,
      themeId: selectedTheme,
      published: false
    };
    
    console.log('Preparing to save store data:', storeData);
    
    try {
      // Test JSON.stringify first
      const jsonString = JSON.stringify(storeData);
      const sizeInMB = new Blob([jsonString]).size / 1024 / 1024;
      console.log('JSON string length:', jsonString.length);
      console.log('Size in MB:', sizeInMB.toFixed(2));
      
      // Warn if size is large
      if (sizeInMB > 5) {
        console.warn('Warning: Data size exceeds 5MB. This might cause issues with localStorage.');
        if (!confirm(`Your store data is quite large (${sizeInMB.toFixed(2)}MB) due to uploaded images. This might cause saving issues. Continue anyway?`)) {
          return;
        }
      }
      
      // Check if localStorage is available
      if (typeof window !== 'undefined' && window.localStorage) {
        // Clear old data first to make space
        localStorage.removeItem('tempStore');
        
        // Try to save
        localStorage.setItem('tempStore', jsonString);
        console.log('Store data saved successfully to localStorage');
        
        // Verify it was saved
        const savedData = localStorage.getItem('tempStore');
        if (savedData) {
          console.log('Verified: Data successfully retrieved from localStorage');
          router.push(`/preview?store=${subdomain}`);
        } else {
          throw new Error('Data was not saved to localStorage');
        }
      } else {
        throw new Error('localStorage is not available');
      }
    } catch (error) {
      console.error('Error saving store:', error);
      
      // Check if it's a quota exceeded error
      const isQuotaError = error instanceof Error && 
        (error.name === 'QuotaExceededError' || 
         error.message.includes('quota') ||
         error.message.includes('storage'));
      
      if (isQuotaError) {
        console.error('localStorage quota exceeded');
        alert(`Storage quota exceeded! Your uploaded images are too large for browser storage (limit ~5-10MB).

Solutions:
1. Use smaller images (compress before uploading)
2. Use fewer product images
3. We'll use placeholder images for now

Proceeding without images...`);
        
        // Try again without images
        try {
          const storeDataNoImages = {
            ...storeData,
            products: storeData.products.map((p) => ({
              ...p,
              image: '' // Use empty string instead of undefined
            }))
          };
          localStorage.removeItem('tempStore');
          localStorage.setItem('tempStore', JSON.stringify(storeDataNoImages));
          console.log('Saved successfully without images');
          router.push(`/preview?store=${subdomain}`);
          return;
        } catch (retryError) {
          console.error('Failed even without images:', retryError);
        }
      }
      
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        storeDataKeys: Object.keys(storeData),
        productsCount: storeData.products?.length
      });
      
      alert(`Failed to save store data: ${error instanceof Error ? error.message : 'Unknown error'}

Check browser console for details.`);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) return brandName.trim() !== '';
    if (currentStep === 2) return products.some(p => p.name.trim() !== '');
    return true;
  };

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
            <Link href="/dashboard" className="text-gray-200 hover:text-blue-400 transition-colors font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg border-2 transition-all ${
                    currentStep >= step
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-500 glow'
                      : 'glass-dark text-gray-400 border-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 rounded transition-all ${
                      currentStep > step ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={currentStep === 1 ? 'text-blue-400 font-semibold' : 'text-gray-400'}>
              Brand Info
            </span>
            <span className={currentStep === 2 ? 'text-blue-400 font-semibold' : 'text-gray-400'}>
              Add Products
            </span>
            <span className={currentStep === 3 ? 'text-blue-400 font-semibold' : 'text-gray-400'}>
              Choose Theme
            </span>
            <span className={currentStep === 4 ? 'text-blue-400 font-semibold' : 'text-gray-400'}>
              Preview & Publish
            </span>
          </div>
        </div>

        <div className="glass-dark rounded-2xl shadow-2xl p-8 border border-blue-500/20">
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Tell us about your brand</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Brand Name <span className="text-blue-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                    placeholder="Enter your brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
                  >
                    <option value="" className="bg-slate-900">Select industry (optional)</option>
                    <option value="fashion" className="bg-slate-900">Fashion & Apparel</option>
                    <option value="tech" className="bg-slate-900">Tech & Gadgets</option>
                    <option value="food" className="bg-slate-900">Food & Beverage</option>
                    <option value="health" className="bg-slate-900">Health & Wellness</option>
                    <option value="home" className="bg-slate-900">Home & Living</option>
                    <option value="default" className="bg-slate-900">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Brand Description (Optional)
                  </label>
                  <textarea
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    className="w-full px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                    rows={4}
                    placeholder="Tell us about your brand... (AI will generate if left empty)"
                  />
                  <p className="text-sm text-gray-400 mt-3 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    Our AI will generate a compelling brand description if you leave this empty
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center glow-purple">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Add your products</h2>
              </div>

              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={index} className="glass-dark border border-blue-500/20 rounded-xl p-6 relative hover:border-blue-500/40 transition-all">
                    {products.length > 1 && (
                      <button
                        onClick={() => removeProduct(index)}
                        className="absolute top-4 right-4 text-red-400 hover:text-red-300 hover:scale-110 transition-all"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                    
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-3">
                          Product Name <span className="text-blue-400">*</span>
                        </label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProduct(index, 'name', e.target.value)}
                          className="w-full px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                          placeholder="e.g., Premium Leather Jacket"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-3">
                            Category
                          </label>
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e) => updateProduct(index, 'category', e.target.value)}
                            className="w-full px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                            placeholder="e.g., Clothing"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-200 mb-3">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            value={product.price || ''}
                            onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                            placeholder="99.99"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-200 mb-3">
                          Product Image (Optional)
                        </label>
                        {product.image ? (
                          <div className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden border-2 border-blue-500/30 relative">
                              <Image
                                src={product.image}
                                alt={product.name || 'Product'}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <label className="block">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(index, e)}
                              className="hidden"
                            />
                            <div className="glass-dark border-2 border-dashed border-blue-500/30 rounded-xl p-10 cursor-pointer hover:border-blue-500 transition-all text-center">
                              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                              <p className="text-gray-300 font-medium mb-1">Click to upload image</p>
                              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                          </label>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-400" />
                        AI will generate product descriptions, features, and optimize SEO
                      </p>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addProduct}
                  className="w-full py-5 border-2 border-dashed border-blue-500/30 rounded-xl text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all flex items-center justify-center gap-3 glass-dark font-semibold"
                >
                  <Plus className="h-5 w-5" />
                  Add Another Product
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && generatedStore && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Choose your theme</h2>
              </div>

              <div className="mb-10 glass p-6 rounded-xl border border-blue-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="h-5 w-5 text-blue-400" />
                  <h3 className="font-bold text-lg text-white">AI Generated Brand Identity</h3>
                </div>
                <p className="text-gray-300 mb-5 text-lg italic">&ldquo;{generatedStore.tagline}&rdquo;</p>
                <div className="flex gap-3 flex-wrap">
                  {Object.entries(generatedStore.colorScheme).slice(0, 3).map(([name, color]) => (
                    <div key={name} className="flex items-center gap-3 glass-dark px-4 py-2 rounded-lg border border-blue-500/20">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-white/20 shadow-lg"
                        style={{ backgroundColor: color as string }}
                      />
                      <span className="text-sm capitalize text-gray-300 font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-blue-400">✨</span> Modern Themes
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { id: 'modern-minimal', name: 'Modern Minimal', desc: 'Clean & Professional' },
                      { id: 'tech-modern', name: 'Tech Modern', desc: 'Sleek & Modern' },
                      { id: 'boutique-chic', name: 'Boutique Chic', desc: 'Stylish & Trendy' },
                      { id: 'gradient-modern', name: 'Gradient Modern', desc: 'Vibrant & Contemporary' },
                      { id: 'corporate-pro', name: 'Corporate Pro', desc: 'Professional & Trustworthy' }
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTheme === theme.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/30'
                            : 'border-blue-500/20 glass-dark hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-white">{theme.name}</h3>
                          {selectedTheme === theme.id && (
                            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center glow">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{theme.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-purple-400">🎨</span> Minimal Themes
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { id: 'minimal-zen', name: 'Minimal Zen', desc: 'Ultra Minimal' },
                      { id: 'soft-pastel', name: 'Soft Pastel', desc: 'Gentle & Light' },
                      { id: 'minimalist-mono', name: 'Minimalist Monochrome', desc: 'Black & White' }
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTheme === theme.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/30'
                            : 'border-blue-500/20 glass-dark hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-white">{theme.name}</h3>
                          {selectedTheme === theme.id && (
                            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center glow">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{theme.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-pink-400">⚡</span> Bold Themes
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { id: 'bold-vibrant', name: 'Bold & Vibrant', desc: 'Eye-catching' },
                      { id: 'urban-edge', name: 'Urban Edge', desc: 'Edgy & Urban' },
                      { id: 'neon-cyber', name: 'Neon Cyber', desc: 'Futuristic & Gaming' },
                      { id: 'artistic-creative', name: 'Artistic Creative', desc: 'Unique & Artistic' }
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTheme === theme.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/30'
                            : 'border-blue-500/20 glass-dark hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-white">{theme.name}</h3>
                          {selectedTheme === theme.id && (
                            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center glow">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{theme.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-yellow-400">👑</span> Classic Themes
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { id: 'classic-elegant', name: 'Classic Elegant', desc: 'Timeless Luxury' },
                      { id: 'luxury-premium', name: 'Luxury Premium', desc: 'High-end & Exclusive' },
                      { id: 'vintage-retro', name: 'Vintage Retro', desc: 'Nostalgic & Classic' },
                      { id: 'organic-natural', name: 'Organic Natural', desc: 'Eco-friendly & Natural' }
                    ].map((theme) => (
                      <div
                        key={theme.id}
                        onClick={() => setSelectedTheme(theme.id)}
                        className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedTheme === theme.id
                            ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/30'
                            : 'border-blue-500/20 glass-dark hover:border-blue-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-bold text-lg text-white">{theme.name}</h3>
                          {selectedTheme === theme.id && (
                            <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center glow">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{theme.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && generatedStore && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center glow-green">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Preview & Publish</h2>
              </div>

              <div className="space-y-8">
                <div className="glass p-8 rounded-xl border border-green-500/30">
                  <h3 className="font-bold text-2xl mb-6 text-white flex items-center gap-3">
                    Your Store is Ready! 🎉
                  </h3>
                  <div className="space-y-4 text-base">
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400">Brand Name:</span>
                      <span className="font-bold text-white">{generatedStore.brandName}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400">Tagline:</span>
                      <span className="font-semibold text-gray-200">{generatedStore.tagline}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-700">
                      <span className="text-gray-400">Products:</span>
                      <span className="font-bold text-blue-400">{generatedStore.products.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-400">Theme:</span>
                      <span className="font-semibold text-purple-400 capitalize">{selectedTheme.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-200 mb-3">
                    Your Store URL
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="flex-1 px-5 py-4 glass-dark border border-blue-500/30 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
                      placeholder="your-store-name"
                    />
                    <span className="text-gray-400 font-medium">.storeforge.ai</span>
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-8">
                  <h3 className="font-bold text-xl mb-6 text-white">AI Generated Products Preview</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {generatedStore.products.map((product, index) => (
                      <div key={index} className="glass-dark border border-blue-500/20 rounded-xl p-5 hover:border-blue-500/40 transition-all">
                        <h4 className="font-bold text-lg mb-2 text-white">{product.name}</h4>
                        <p className="text-sm text-gray-300 mb-3">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ${product.price}
                          </span>
                          <span className="text-sm text-gray-400 px-3 py-1 glass rounded-full border border-blue-500/30">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-10 pt-8 border-t border-gray-700">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-3 px-8 py-4 glass-dark border border-blue-500/30 rounded-xl text-gray-200 hover:border-blue-500 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold glow"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all font-semibold glow-green"
              >
                <Sparkles className="h-5 w-5" />
                Preview Store
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
