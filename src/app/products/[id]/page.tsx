'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  longDescription: string;
  specifications: string[];
  features: string[];
}

const products: Product[] = [
  {
    id: 1,
    name: "Modern Table Lamp",
    category: "Table Lamps",
    price: 89.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "This elegant modern table lamp combines contemporary design with functional lighting. Crafted with premium materials, it features a sleek metal base and a sophisticated fabric shade that diffuses light beautifully. Perfect for reading, working, or creating ambient lighting in any room.",
    specifications: [
      "Height: 24 inches",
      "Base diameter: 6 inches",
      "Shade diameter: 12 inches",
      "Bulb type: E26 LED compatible",
      "Maximum wattage: 60W",
      "Material: Metal base, fabric shade",
      "Cord length: 6 feet"
    ],
    features: [
      "Adjustable brightness",
      "Touch-sensitive switch",
      "Energy-efficient LED compatible",
      "Stable weighted base",
      "Easy assembly required",
      "1-year warranty included"
    ]
  },
  {
    id: 6,
    name: "Industrial Floor Lamp",
    category: "Floor Lamps",
    price: 149.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "A striking industrial-style floor lamp that brings urban sophistication to any space. The exposed metal framework and Edison-style bulb create a vintage industrial aesthetic while providing excellent task lighting.",
    specifications: [
      "Height: 58 inches",
      "Base: 12 inch diameter",
      "Material: Steel frame",
      "Finish: Matte black",
      "Bulb: Edison LED included",
      "Switch: Foot switch"
    ],
    features: [
      "Vintage Edison bulb included",
      "Sturdy steel construction",
      "Foot-operated switch",
      "Industrial design",
      "Easy assembly"
    ]
  },
  {
    id: 7,
    name: "Minimalist Desk Lamp",
    category: "Desk Lamps",
    price: 69.99,
    images: [
      "/images/lamp7-1.jpg",
      "/images/lamp7-2.jpg",
      "/images/lamp7-3.jpg",
      "/images/lamp7-4.jpg",
      "/images/lamp7-5.jpg"
    ],
    longDescription: "Clean lines and functional design define this minimalist desk lamp. Perfect for modern workspaces, it offers focused lighting with an adjustable arm and head for optimal positioning.",
    specifications: [
      "Height: 18 inches",
      "Arm reach: 14 inches",
      "Base: 4 inch diameter",
      "Material: Aluminum",
      "Finish: White",
      "LED: Integrated 12W"
    ],
    features: [
      "Fully adjustable arm",
      "Integrated LED",
      "Touch controls",
      "USB charging port",
      "Memory function",
      "Eye-care lighting"
    ]
  }
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 font-medium transition-colors"
            prefetch={true}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>

        {/* Product Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>
              
              {/* Thumbnail Images */}
                <div className="flex gap-2 justify-center">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-gray-800 scale-105 shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{product.category}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold" style={{ color: '#d4af37' }}>{product.price}</p>
              </div>

              <div className="space-y-4">
                <button 
                  className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#1a1a1a' }}
                >
                  Add to Cart
                </button>
                <button 
                  className="w-full border-2 py-3 px-6 rounded-lg font-semibold transition-colors hover:text-white"
                  style={{ 
                    borderColor: '#1a1a1a', 
                    color: '#1a1a1a'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#1a1a1a';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#1a1a1a';
                  }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-1">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'description'
                    ? 'text-gray-900 border-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'specifications'
                    ? 'text-gray-900 border-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'features'
                    ? 'text-gray-900 border-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#1a1a1a' }}>Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {product.longDescription}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#1a1a1a' }}>Specifications</h3>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span 
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" 
                        style={{ backgroundColor: '#d4af37' }}
                      ></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#1a1a1a' }}>Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 flex items-start">
                      <span 
                        className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" 
                        style={{ backgroundColor: '#d4af37' }}
                      ></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}