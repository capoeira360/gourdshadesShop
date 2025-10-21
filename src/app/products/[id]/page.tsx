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
    id: 2,
    name: "Crystal Chandelier",
    category: "Chandeliers",
    price: 299.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "Elegant crystal chandelier that adds glamour and sophistication to any dining room or living space. Features hand-cut crystals that create beautiful light patterns and reflections throughout the room.",
    specifications: [
      "Height: 36 inches",
      "Diameter: 24 inches",
      "Material: Crystal and chrome",
      "Bulb type: E12 candelabra",
      "Maximum wattage: 40W per bulb",
      "Number of bulbs: 6",
      "Chain length: 72 inches"
    ],
    features: [
      "Hand-cut crystal elements",
      "Chrome finish frame",
      "Adjustable chain length",
      "Dimmable compatible",
      "Easy installation",
      "2-year warranty"
    ]
  },
  {
    id: 3,
    name: "Vintage Pendant Light",
    category: "Pendant Lights",
    price: 129.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "Vintage-inspired pendant light with Edison bulb and brass finish. Perfect for kitchen islands, dining areas, or creating a warm, nostalgic atmosphere in any space.",
    specifications: [
      "Height: 12 inches",
      "Diameter: 8 inches",
      "Material: Brass and glass",
      "Bulb type: E26 Edison",
      "Maximum wattage: 60W",
      "Cord length: 60 inches",
      "Finish: Antique brass"
    ],
    features: [
      "Vintage Edison bulb included",
      "Antique brass finish",
      "Clear glass shade",
      "Adjustable cord length",
      "Easy installation",
      "Industrial vintage style"
    ]
  },
  {
    id: 4,
    name: "Contemporary Floor Lamp",
    category: "Floor Lamps",
    price: 179.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "Sleek contemporary floor lamp with arc design and marble base. Features adjustable LED spotlight perfect for reading corners or accent lighting in modern living spaces.",
    specifications: [
      "Height: 65 inches",
      "Arc reach: 48 inches",
      "Base: 12 inch marble",
      "Material: Steel and marble",
      "LED: Integrated 15W",
      "Finish: Brushed nickel",
      "Switch: Dimmer on base"
    ],
    features: [
      "Carrara marble base",
      "Adjustable LED spotlight",
      "Built-in dimmer switch",
      "Arc design for over-furniture lighting",
      "Energy-efficient LED",
      "Modern contemporary style"
    ]
  },
  {
    id: 5,
    name: "Rustic Wall Sconce",
    category: "Wall Sconces",
    price: 79.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "Rustic wall sconce with weathered wood and metal construction. Ideal for farmhouse, cabin, or industrial decor themes. Provides warm ambient lighting for hallways and living areas.",
    specifications: [
      "Height: 14 inches",
      "Width: 8 inches",
      "Depth: 6 inches",
      "Material: Wood and metal",
      "Bulb type: E26 standard",
      "Maximum wattage: 60W",
      "Finish: Weathered wood"
    ],
    features: [
      "Reclaimed wood construction",
      "Metal cage design",
      "Wall-mounted installation",
      "Rustic farmhouse style",
      "Easy wiring included",
      "Weathered finish"
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
  },
  {
    id: 8,
    name: "Art Deco Table Lamp",
    category: "Table Lamps",
    price: 199.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "Stunning Art Deco inspired table lamp with geometric patterns and gold finish. Features a luxurious fabric shade and intricate metalwork that captures the glamour of the 1920s era.",
    specifications: [
      "Height: 26 inches",
      "Base diameter: 7 inches",
      "Shade diameter: 14 inches",
      "Material: Metal and fabric",
      "Finish: Antique gold",
      "Bulb type: E26 LED compatible",
      "Maximum wattage: 75W"
    ],
    features: [
      "Art Deco geometric design",
      "Antique gold finish",
      "Premium fabric shade",
      "Weighted base for stability",
      "In-line dimmer switch",
      "Vintage glamour style"
    ]
  },
  {
    id: 9,
    name: "Modern Ceiling Fan Light",
    category: "Ceiling Fans",
    price: 249.99,
    images: [
      "/images/lamp7-1.jpg",
      "/images/lamp7-2.jpg",
      "/images/lamp7-3.jpg",
      "/images/lamp7-4.jpg",
      "/images/lamp7-5.jpg"
    ],
    longDescription: "Contemporary ceiling fan with integrated LED lighting. Features reversible motor, remote control, and sleek blade design perfect for modern homes and offices.",
    specifications: [
      "Blade span: 52 inches",
      "Height: 12 inches",
      "Material: Steel and wood",
      "LED: Integrated 24W",
      "Motor: Reversible DC",
      "Speed settings: 6",
      "Remote control included"
    ],
    features: [
      "Integrated LED lighting",
      "Remote control operation",
      "Reversible motor for year-round use",
      "Energy-efficient DC motor",
      "Quiet operation",
      "Modern blade design"
    ]
  },
  {
    id: 10,
    name: "Bohemian Pendant Cluster",
    category: "Pendant Lights",
    price: 189.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "Eclectic bohemian pendant cluster featuring three woven rattan shades at varying heights. Creates beautiful textured lighting perfect for dining areas and bohemian-style interiors.",
    specifications: [
      "Total height: 36 inches",
      "Shade diameter: 10 inches each",
      "Material: Natural rattan",
      "Number of pendants: 3",
      "Bulb type: E26 standard",
      "Maximum wattage: 60W each",
      "Cord length: Adjustable"
    ],
    features: [
      "Hand-woven rattan shades",
      "Three pendant cluster design",
      "Adjustable hanging heights",
      "Natural bohemian style",
      "Creates textured light patterns",
      "Eco-friendly materials"
    ]
  },
  {
    id: 11,
    name: "Smart LED Strip Light",
    category: "LED Strips",
    price: 59.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "WiFi-enabled smart LED strip light with millions of colors and app control. Perfect for accent lighting, gaming setups, or creating ambient mood lighting in any room.",
    specifications: [
      "Length: 16.4 feet",
      "LED count: 300 LEDs",
      "Colors: 16 million",
      "Connectivity: WiFi 2.4GHz",
      "Power: 24W",
      "Voltage: 12V DC",
      "App control: iOS/Android"
    ],
    features: [
      "16 million color options",
      "WiFi app control",
      "Voice assistant compatible",
      "Music sync capability",
      "Timer and scheduling",
      "Easy adhesive installation"
    ]
  },
  {
    id: 12,
    name: "Tiffany Style Stained Glass Lamp",
    category: "Table Lamps",
    price: 159.99,
    images: [
      "/images/lamp7-1.jpg",
      "/images/lamp7-2.jpg",
      "/images/lamp7-3.jpg",
      "/images/lamp7-4.jpg",
      "/images/lamp7-5.jpg"
    ],
    longDescription: "Beautiful Tiffany-style stained glass table lamp with intricate floral patterns. Hand-assembled glass pieces create stunning colored light effects reminiscent of classic Art Nouveau design.",
    specifications: [
      "Height: 22 inches",
      "Shade diameter: 16 inches",
      "Material: Stained glass and bronze",
      "Pattern: Floral motif",
      "Bulb type: E26 standard",
      "Maximum wattage: 60W",
      "Base: Cast bronze"
    ],
    features: [
      "Hand-assembled stained glass",
      "Authentic Tiffany-style design",
      "Bronze finished base",
      "Intricate floral patterns",
      "Colored light effects",
      "Classic Art Nouveau style"
    ]
  },
  {
    id: 13,
    name: "Scandinavian Wood Floor Lamp",
    category: "Floor Lamps",
    price: 139.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "Minimalist Scandinavian floor lamp crafted from sustainable oak wood with a clean white fabric shade. Embodies Nordic design principles of simplicity, functionality, and natural materials.",
    specifications: [
      "Height: 60 inches",
      "Base: Oak wood tripod",
      "Shade: White fabric drum",
      "Shade diameter: 18 inches",
      "Material: Sustainable oak",
      "Bulb type: E26 LED compatible",
      "Maximum wattage: 75W"
    ],
    features: [
      "Sustainable oak wood construction",
      "Scandinavian minimalist design",
      "Tripod base for stability",
      "Natural wood grain finish",
      "White fabric drum shade",
      "Eco-friendly materials"
    ]
  },
  {
    id: 14,
    name: "Industrial Pipe Wall Light",
    category: "Wall Sconces",
    price: 89.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "Rugged industrial wall light featuring exposed pipe construction and Edison bulb. Perfect for loft-style apartments, workshops, or adding urban character to any space.",
    specifications: [
      "Height: 10 inches",
      "Width: 12 inches",
      "Depth: 8 inches",
      "Material: Iron pipe and fittings",
      "Finish: Rust-resistant black",
      "Bulb type: E26 Edison",
      "Maximum wattage: 60W"
    ],
    features: [
      "Authentic pipe construction",
      "Edison bulb included",
      "Rust-resistant finish",
      "Industrial loft style",
      "Easy wall mounting",
      "Exposed hardware design"
    ]
  },
  {
    id: 15,
    name: "Crystal Ball Table Lamp",
    category: "Table Lamps",
    price: 119.99,
    images: [
      "/images/lamp7-1.jpg",
      "/images/lamp7-2.jpg",
      "/images/lamp7-3.jpg",
      "/images/lamp7-4.jpg",
      "/images/lamp7-5.jpg"
    ],
    longDescription: "Elegant crystal ball table lamp with chrome base and white pleated shade. The crystal sphere creates beautiful light refraction and adds glamorous sparkle to bedrooms and living areas.",
    specifications: [
      "Height: 20 inches",
      "Crystal diameter: 6 inches",
      "Shade diameter: 12 inches",
      "Material: Crystal and chrome",
      "Shade: White pleated fabric",
      "Bulb type: E26 LED compatible",
      "Maximum wattage: 60W"
    ],
    features: [
      "Genuine crystal sphere base",
      "Chrome finished accents",
      "White pleated fabric shade",
      "Light refraction effects",
      "Glamorous contemporary style",
      "Stable weighted base"
    ]
  },
  {
    id: 16,
    name: "Moroccan Lantern Pendant",
    category: "Pendant Lights",
    price: 169.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "Authentic Moroccan-style lantern pendant with intricate metalwork and colored glass panels. Creates exotic ambiance with beautiful patterned shadows and warm colored light.",
    specifications: [
      "Height: 18 inches",
      "Diameter: 12 inches",
      "Material: Brass and colored glass",
      "Pattern: Traditional Moroccan",
      "Bulb type: E26 standard",
      "Maximum wattage: 60W",
      "Chain length: 36 inches"
    ],
    features: [
      "Authentic Moroccan design",
      "Hand-crafted metalwork",
      "Colored glass panels",
      "Intricate shadow patterns",
      "Antique brass finish",
      "Exotic ambient lighting"
    ]
  },
  {
    id: 17,
    name: "Modern Track Lighting System",
    category: "Track Lighting",
    price: 229.99,
    images: [
      "/images/lamp7-1.jpg",
      "/images/lamp7-2.jpg",
      "/images/lamp7-3.jpg",
      "/images/lamp7-4.jpg",
      "/images/lamp7-5.jpg"
    ],
    longDescription: "Flexible track lighting system with four adjustable LED spotlights. Perfect for galleries, kitchens, or any space requiring directional accent lighting with modern appeal.",
    specifications: [
      "Track length: 48 inches",
      "Number of lights: 4",
      "LED power: 12W per light",
      "Material: Aluminum track",
      "Finish: Brushed nickel",
      "Beam angle: Adjustable",
      "Dimmer compatible: Yes"
    ],
    features: [
      "Four adjustable LED spotlights",
      "360-degree rotation capability",
      "Brushed nickel finish",
      "Energy-efficient LED technology",
      "Easy ceiling installation",
      "Modern gallery-style lighting"
    ]
  },
  {
    id: 18,
    name: "Vintage Banker's Lamp",
    category: "Desk Lamps",
    price: 99.99,
    images: [
      "/images/lamp7-1.jpg",
      "/images/lamp7-2.jpg",
      "/images/lamp7-3.jpg",
      "/images/lamp7-4.jpg",
      "/images/lamp7-5.jpg"
    ],
    longDescription: "Classic banker's lamp with green glass shade and brass base. Features traditional pull-chain switch and timeless design perfect for home offices, libraries, and study areas.",
    specifications: [
      "Height: 14 inches",
      "Shade length: 10 inches",
      "Material: Brass and glass",
      "Shade color: Emerald green",
      "Bulb type: E26 standard",
      "Maximum wattage: 60W",
      "Switch: Pull chain"
    ],
    features: [
      "Authentic banker's lamp design",
      "Emerald green glass shade",
      "Solid brass construction",
      "Traditional pull-chain switch",
      "Adjustable shade angle",
      "Classic office style"
    ]
  },
  {
    id: 19,
    name: "Contemporary Drum Chandelier",
    category: "Chandeliers",
    price: 279.99,
    images: [
      "/images/lamp1-1.jpg",
      "/images/lamp1-2.jpg",
      "/images/lamp1-3.jpg",
      "/images/lamp1-4.jpg",
      "/images/lamp1-5.jpg"
    ],
    longDescription: "Sophisticated drum chandelier with white fabric shade and chrome frame. Provides elegant ambient lighting perfect for dining rooms, entryways, and contemporary living spaces.",
    specifications: [
      "Height: 24 inches",
      "Diameter: 20 inches",
      "Material: Chrome and fabric",
      "Shade: White drum fabric",
      "Bulb type: E26 standard",
      "Number of bulbs: 3",
      "Maximum wattage: 60W each"
    ],
    features: [
      "Large drum fabric shade",
      "Chrome finished frame",
      "Three-light configuration",
      "Adjustable chain length",
      "Contemporary elegant design",
      "Soft ambient lighting"
    ]
  },
  {
    id: 20,
    name: "Solar Garden Path Lights",
    category: "Outdoor Lighting",
    price: 79.99,
    images: [
      "/images/lamp6-1.jpg",
      "/images/lamp6-2.jpg",
      "/images/lamp6-3.jpg",
      "/images/lamp6-4.jpg",
      "/images/lamp6-5.jpg"
    ],
    longDescription: "Set of 8 solar-powered LED path lights with automatic dusk-to-dawn operation. Weather-resistant construction perfect for illuminating walkways, gardens, and outdoor spaces.",
    specifications: [
      "Quantity: 8 lights",
      "Height: 15 inches each",
      "Material: Stainless steel",
      "LED: Warm white 3000K",
      "Solar panel: Monocrystalline",
      "Battery: Rechargeable Li-ion",
      "Runtime: 8-10 hours"
    ],
    features: [
      "Solar powered operation",
      "Automatic dusk-to-dawn sensor",
      "Weather-resistant construction",
      "No wiring required",
      "Warm white LED illumination",
      "Easy stake installation"
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