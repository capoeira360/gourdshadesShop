'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  images: string[];
  description: string;
  longDescription: string;
  specifications: string[];
  features: string[];
}

const products: Product[] = [
  {
    id: 'aurora-collection',
    name: 'Aurora Collection',
    category: 'collection',
    price: '$329 - $449',
    images: [
      '/images/20240405_131741-a1.jpg',
      '/images/20240405_131752-a2.jpg',
      '/images/20240405_132015-a3.jpg',
      '/images/20240405_132238-a4.jpg',
      '/images/20240408_112214-a5.jpg'
    ],
    description: 'A comprehensive lighting collection featuring pendant, chandelier, sconce, table, and floor lamps with sleek modern design and premium materials.',
    longDescription: 'The Aurora Collection represents the pinnacle of contemporary lighting design, featuring five distinct pieces that work harmoniously together or as standalone statement pieces. Each lamp in this collection showcases sleek modern aesthetics with premium materials including brushed aluminum, tempered glass, and high-quality LED components. The collection includes a sophisticated pendant light perfect for dining areas, an elegant chandelier for grand spaces, a minimalist sconce for accent lighting, a versatile table lamp for task lighting, and a striking floor lamp for ambient illumination. All pieces feature energy-efficient LED technology with dimming capabilities and are designed to complement modern and transitional interior styles.',
    specifications: [
      "Collection: 5 distinct lighting pieces",
      "Materials: Brushed aluminum, tempered glass, premium LED",
      "Finish: Satin nickel with clear glass accents",
      "LED Technology: Integrated, dimmable, 3000K warm white",
      "Power: 15W-45W depending on piece",
      "Lifespan: 50,000+ hours LED life",
      "Warranty: 5-year comprehensive coverage"
    ],
    features: [
      "Complete 5-piece lighting collection",
      "Coordinated modern design aesthetic",
      "Energy-efficient LED technology",
      "Dimmable lighting control",
      "Premium brushed aluminum construction",
      "Tempered glass components",
      "Easy installation with included hardware",
      "5-year manufacturer warranty"
    ]
  },
  {
    id: 'brooklyn-series',
    name: 'Brooklyn Series',
    category: 'collection',
    price: '$179 - $899',
    images: [
      '/images/20240508_141055-b1.jpg',
      '/images/20240508_141122-b2.jpg',
      '/images/20240508_141338-b3.jpg',
      '/images/20240508_141359-b4.jpg',
      '/images/20240508_141454-b5.jpg'
    ],
    description: 'Industrial-inspired lighting series combining geometric forms with warm brass finishes and smart technology integration.',
    longDescription: 'The Brooklyn Series draws inspiration from the industrial heritage of New York\'s most iconic borough, featuring bold geometric forms and warm brass finishes that bring urban sophistication to any space. This five-piece collection seamlessly blends vintage industrial aesthetics with cutting-edge smart technology, offering app-controlled dimming, color temperature adjustment, and voice assistant compatibility. Each piece features hand-finished brass components, exposed Edison-style LED bulbs, and architectural lines that make a statement while providing exceptional functionality. Perfect for loft apartments, modern offices, or anyone looking to add urban character to their lighting design.',
    specifications: [
      "Collection: 5 industrial-inspired pieces",
      "Materials: Brass, steel, Edison-style LED bulbs",
      "Finish: Warm brass with matte black accents",
      "Smart Features: App control, voice assistant compatible",
      "LED Technology: Dimmable, adjustable color temperature",
      "Power: 12W-60W depending on piece",
      "Connectivity: WiFi enabled, smartphone app included"
    ],
    features: [
      "Industrial-inspired geometric design",
      "Smart technology integration",
      "App-controlled dimming and color temperature",
      "Voice assistant compatibility",
      "Hand-finished brass construction",
      "Edison-style LED bulbs included",
      "Architectural statement pieces",
      "Urban loft aesthetic"
    ]
  },
  {
    id: 'crystal-line',
    name: 'Crystal Line',
    category: 'collection',
    price: '$189 - $2,199',
    images: [
      '/images/20240520_160914-c1.jpg',
      '/images/20240520_161245-c2.jpg',
      '/images/20240520_161300-c3.jpg',
      '/images/20240520_161309-c4.jpg',
      '/images/20240520_161319-c5.jpg'
    ],
    description: 'Luxurious crystal lighting collection featuring hand-cut crystals and elegant metalwork for sophisticated interiors.',
    longDescription: 'The Crystal Line represents the epitome of luxury lighting, featuring genuine hand-cut crystals and precision-crafted metalwork that creates stunning light refraction and elegant ambiance. This prestigious collection includes five meticulously designed pieces, each showcasing different crystal cutting techniques and arrangements to maximize light dispersion and create captivating sparkle effects. The collection features premium chrome and gold finish options, with each crystal individually selected and positioned for optimal light performance. From intimate table lamps to grand chandeliers, the Crystal Line transforms any space into a sophisticated showcase of light and luxury.',
    specifications: [
      "Collection: 5 luxury crystal pieces",
      "Materials: Hand-cut genuine crystals, premium metals",
      "Finish Options: Polished chrome or 24k gold plated",
      "Crystal Grade: Premium K9 crystal components",
      "LED Technology: High-CRI, dimmable, warm white",
      "Power: 20W-150W depending on piece",
      "Installation: Professional installation recommended"
    ],
    features: [
      "Genuine hand-cut crystal components",
      "Premium chrome or gold finish options",
      "Stunning light refraction effects",
      "High-CRI LED for optimal crystal sparkle",
      "Luxury packaging and presentation",
      "Professional installation service available",
      "Lifetime crystal replacement guarantee",
      "Sophisticated European design"
    ]
  },
  {
    id: 'designer-collection',
    name: 'Designer Collection',
    category: 'collection',
    price: '$249 - $1,299',
    images: [
      '/images/20240607_162317-d1.jpg',
      '/images/20240607_162627-d2.jpg',
      '/images/20240607_162641-d3.jpg',
      '/images/20240607_162656-d4.jpg',
      '/images/20240607_162743-d5.jpg'
    ],
    description: 'Curated designer lighting collection featuring unique artistic forms and premium materials from renowned lighting designers.',
    longDescription: 'The Designer Collection showcases the work of internationally acclaimed lighting designers, featuring five unique pieces that blur the line between functional lighting and artistic sculpture. Each piece in this collection represents a different design philosophy, from minimalist Scandinavian aesthetics to bold contemporary statements. Crafted with premium materials including hand-blown glass, sustainably sourced woods, and precision-machined metals, these pieces are as much about artistic expression as they are about illumination. The collection includes limited edition pieces and exclusive designs not available elsewhere, making each installation a unique artistic statement.',
    specifications: [
      "Collection: 5 designer collaboration pieces",
      "Materials: Hand-blown glass, premium woods, machined metals",
      "Design: Limited edition and exclusive pieces",
      "LED Technology: Artist-specified color temperatures",
      "Power: Variable, optimized per design",
      "Certification: Designer authenticity certificates included",
      "Availability: Limited production runs"
    ],
    features: [
      "Internationally acclaimed designer collaborations",
      "Limited edition and exclusive designs",
      "Premium hand-crafted materials",
      "Artistic sculpture meets functional lighting",
      "Designer authenticity certificates",
      "Collector-quality construction",
      "Unique artistic statement pieces",
      "Museum-quality presentation"
    ]
  },
  {
    id: 'essence-series',
    name: 'Essence Series',
    category: 'collection',
    price: '$149 - $699',
    images: [
      '/images/20240612_135043-e1.jpg',
      '/images/20240612_135118-e2.jpg',
      '/images/20240612_135256-e3.jpg',
      '/images/20240612_135313-e4.jpg',
      '/images/20240612_140355-e5.jpg'
    ],
    description: 'Minimalist lighting series emphasizing clean lines, natural materials, and sustainable design principles.',
    longDescription: 'The Essence Series embodies the philosophy that true beauty lies in simplicity, featuring five carefully designed pieces that celebrate clean lines, natural materials, and sustainable manufacturing practices. Each piece in this collection is crafted from responsibly sourced materials including FSC-certified woods, recycled metals, and low-impact finishes. The design aesthetic draws from Scandinavian minimalism and Japanese wabi-sabi principles, creating lighting that enhances rather than dominates a space. With energy-efficient LED technology and modular components for easy maintenance and upgrades, the Essence Series represents lighting design for the environmentally conscious consumer.',
    specifications: [
      "Collection: 5 minimalist sustainable pieces",
      "Materials: FSC-certified wood, recycled metals",
      "Sustainability: Carbon-neutral manufacturing",
      "LED Technology: High-efficiency, long-life components",
      "Power: Ultra-low energy consumption",
      "Packaging: 100% recyclable materials",
      "Certifications: ENERGY STAR, FSC, GREENGUARD"
    ],
    features: [
      "Sustainable and eco-friendly materials",
      "Minimalist Scandinavian design aesthetic",
      "Carbon-neutral manufacturing process",
      "Modular components for easy maintenance",
      "Ultra-efficient LED technology",
      "FSC-certified wood construction",
      "100% recyclable packaging",
      "ENERGY STAR certified"
    ]
  },
  {
    id: 'fusion-line',
    name: 'Fusion Line',
    category: 'collection',
    price: '$199 - $1,099',
    images: [
      '/images/20240614_140132-f2.jpg',
      '/images/20240614_140159-f3.jpg',
      '/images/20240614_140218-f4.jpg',
      '/images/20240614_135944-f5.jpg',
      '/images/20240614_140121-f5.jpg'
    ],
    description: 'Contemporary lighting collection blending traditional craftsmanship with modern technology and innovative materials.',
    longDescription: 'The Fusion Line represents the perfect marriage of traditional craftsmanship and cutting-edge technology, featuring four distinctive pieces that showcase innovative material combinations and advanced lighting control systems. Each piece combines time-honored techniques like hand-forged metalwork and blown glass with modern innovations including smart sensors, adaptive lighting algorithms, and sustainable materials. The collection features pieces that automatically adjust color temperature throughout the day, respond to ambient light conditions, and can be controlled through intuitive gesture recognition. This fusion of old and new creates lighting that honors craftsmanship traditions while embracing the possibilities of tomorrow.',
    specifications: [
      "Collection: 4 technology-enhanced pieces",
      "Materials: Hand-forged metals, blown glass, smart components",
      "Technology: Adaptive lighting, gesture control, smart sensors",
      "LED Technology: Circadian rhythm optimization",
      "Power: Adaptive power management",
      "Connectivity: Bluetooth, WiFi, smart home integration",
      "Updates: Over-the-air firmware updates"
    ],
    features: [
      "Traditional craftsmanship meets modern technology",
      "Adaptive lighting with circadian rhythm support",
      "Gesture recognition control system",
      "Smart sensors for automatic adjustment",
      "Hand-forged metal and blown glass construction",
      "Smart home ecosystem integration",
      "Over-the-air updates and new features",
      "Innovative material combinations"
    ]
  }
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const resolvedParams = use(params);
  const productId = resolvedParams.id;
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
    <div className="bg-gray-50 pt-24 pb-8" style={{ minHeight: 'calc(100vh + var(--footer-height, 200px))' }}>
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
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8" style={{ width: 'calc(100% + 72px)', height: 'calc(644px + 72px + 64px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ width: '680px', height: '716px' }}>
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  width={680}
                  height={716}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all border border-gray-200"
                  style={{ width: '29px', height: '29px', padding: '4px' }}
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextImage}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all border border-gray-200"
                  style={{ width: '29px', height: '29px', padding: '4px' }}
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6" style={{ marginLeft: '-72px' }}>
              <div>
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{product.category}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '180px' }}>{product.name}</h1>
                <p className="text-2xl font-semibold" style={{ color: '#d4af37', marginLeft: '180px' }}>{product.price}</p>
              </div>

              <div className="space-y-4" style={{ marginLeft: '180px' }}>
                <button 
                  className="text-white py-3 px-6 rounded-lg font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#1a1a1a', width: '360px' }}
                >
                  Add to Cart
                </button>
                <button 
                  className="border-2 py-3 px-6 rounded-lg font-semibold transition-colors hover:text-white"
                  style={{ 
                    borderColor: '#1a1a1a', 
                    color: '#1a1a1a',
                    width: '360px'
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

              {/* Thumbnail Images */}
              <div className="flex gap-2" style={{ marginLeft: '180px' }}>
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
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-sm">
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
          <div className="p-8 pb-16">
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