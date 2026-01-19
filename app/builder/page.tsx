'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { generateStoreContent, type ProductInput, type BrandInfo } from '@/lib/ai-generator';

type Step = 1 | 2 | 3 | 4;

export default function BuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [brandDescription, setBrandDescription] = useState('');
  const [products, setProducts] = useState<ProductInput[]>([
    { name: '', category: '', price: 0, features: [] }
  ]);
  const [generatedStore, setGeneratedStore] = useState<ReturnType<typeof generateStoreContent> | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('modern-minimal');
  const [subdomain, setSubdomain] = useState('');

  const addProduct = () => {
    setProducts([...products, { name: '', category: '', price: 0, features: [] }]);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof ProductInput, value: string | number | string[]) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
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

  const handleNext = () => {
    if (currentStep === 2) {
      handleGenerate();
    }
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
    const storeData = {
      ...generatedStore,
      subdomain,
      themeId: selectedTheme,
      published: false
    };
    
    localStorage.setItem('tempStore', JSON.stringify(storeData));
    router.push(`/preview?store=${subdomain}`);
  };

  const canProceed = () => {
    if (currentStep === 1) return brandName.trim() !== '';
    if (currentStep === 2) return products.some(p => p.name.trim() !== '');
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">StoreForge AI</span>
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm">
            <span className={currentStep === 1 ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
              Brand Info
            </span>
            <span className={currentStep === 2 ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
              Add Products
            </span>
            <span className={currentStep === 3 ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
              Choose Theme
            </span>
            <span className={currentStep === 4 ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
              Preview & Publish
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Tell us about your brand</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Enter your brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Select industry (optional)</option>
                    <option value="fashion">Fashion & Apparel</option>
                    <option value="tech">Tech & Gadgets</option>
                    <option value="food">Food & Beverage</option>
                    <option value="health">Health & Wellness</option>
                    <option value="home">Home & Living</option>
                    <option value="default">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Description (Optional)
                  </label>
                  <textarea
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    rows={4}
                    placeholder="Tell us about your brand... (AI will generate if left empty)"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Our AI will generate a compelling brand description if you leave this empty
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Add your products</h2>
              </div>

              <div className="space-y-6">
                {products.map((product, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 relative">
                    {products.length > 1 && (
                      <button
                        onClick={() => removeProduct(index)}
                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Name *
                        </label>
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) => updateProduct(index, 'name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                          placeholder="e.g., Premium Leather Jacket"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <input
                            type="text"
                            value={product.category}
                            onChange={(e) => updateProduct(index, 'category', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="e.g., Clothing"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price ($)
                          </label>
                          <input
                            type="number"
                            value={product.price || ''}
                            onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="99.99"
                          />
                        </div>
                      </div>

                      <p className="text-sm text-gray-500">
                        AI will generate product descriptions, features, and optimize SEO
                      </p>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addProduct}
                  className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Another Product
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && generatedStore && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Choose your theme</h2>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">AI Generated Brand Identity</h3>
                <p className="text-sm text-gray-600 mb-4">{generatedStore.tagline}</p>
                <div className="flex gap-2">
                  {Object.entries(generatedStore.colorScheme).slice(0, 3).map(([name, color]) => (
                    <div key={name} className="flex items-center gap-2">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: color as string }}
                      />
                      <span className="text-xs capitalize">{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { id: 'modern-minimal', name: 'Modern Minimal', desc: 'Clean & Professional' },
                  { id: 'bold-vibrant', name: 'Bold & Vibrant', desc: 'Eye-catching' },
                  { id: 'classic-elegant', name: 'Classic Elegant', desc: 'Timeless Luxury' },
                  { id: 'tech-modern', name: 'Tech Modern', desc: 'Sleek & Modern' },
                  { id: 'boutique-chic', name: 'Boutique Chic', desc: 'Stylish & Trendy' },
                  { id: 'minimal-zen', name: 'Minimal Zen', desc: 'Ultra Minimal' }
                ].map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedTheme === theme.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{theme.name}</h3>
                      {selectedTheme === theme.id && (
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{theme.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 4 && generatedStore && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold">Preview & Publish</h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Your Store is Ready! 🎉</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Brand Name:</span>
                      <span className="font-semibold">{generatedStore.brandName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tagline:</span>
                      <span className="font-semibold">{generatedStore.tagline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Products:</span>
                      <span className="font-semibold">{generatedStore.products.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Theme:</span>
                      <span className="font-semibold capitalize">{selectedTheme.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Store URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={subdomain}
                      onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="your-store-name"
                    />
                    <span className="text-gray-600">.storeforge.ai</span>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">AI Generated Products Preview</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {generatedStore.products.map((product, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-blue-600">${product.price}</span>
                          <span className="text-sm text-gray-500">{product.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handlePublish}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
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
