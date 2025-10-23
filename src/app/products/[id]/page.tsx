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
  },
  {
    id: 'stellar-series',
    name: 'Stellar Series',
    category: 'collection',
    price: '$199 - $899',
    images: [
      '/images/IMG-20241116-WA0036-s1.jpg',
      '/images/IMG-20241116-WA0032-s2.jpg',
      '/images/IMG-20241116-WA0024-s3.jpg',
      '/images/IMG-20241116-WA0016-s4.jpg',
      '/images/IMG-20241116-WA0014-s5.jpg'
    ],
    description: 'Contemporary stellar-inspired lighting collection featuring cosmic designs and celestial aesthetics for modern spaces.',
    longDescription: 'The Stellar Series captures the wonder and beauty of the cosmos, featuring five distinctive pieces that bring celestial elegance to any interior. Each fixture in this collection draws inspiration from stellar formations, nebulae, and cosmic phenomena, translating these natural wonders into sophisticated lighting designs. The series combines modern materials with organic forms, creating pieces that serve as both functional lighting and artistic focal points. With energy-efficient LED technology and customizable brightness settings, the Stellar Series illuminates spaces with the same captivating beauty found in the night sky.',
    specifications: [
      "Collection: 5 cosmic-inspired pieces",
      "Materials: Brushed metals, frosted glass, LED components",
      "Finish: Cosmic bronze with stellar accents",
      "LED Technology: Dimmable, color-changing capabilities",
      "Power: 18W-55W depending on piece",
      "Control: Remote control and app connectivity",
      "Installation: Standard electrical mounting"
    ],
    features: [
      "Cosmic and stellar-inspired designs",
      "Color-changing LED technology",
      "Remote control operation",
      "Dimmable lighting with multiple settings",
      "Premium brushed metal construction",
      "Frosted glass diffusers for soft illumination",
      "App connectivity for smart control",
      "Celestial aesthetic appeal"
    ]
  },
  {
    id: 'radiance-collection',
    name: 'Radiance Collection',
    category: 'collection',
    price: '$229 - $1,199',
    images: [
      '/images/IMG-20250123-WA0028-r1.jpg',
      '/images/IMG-20250123-WA0026-r2.jpg',
      '/images/IMG-20250123-WA0022-r3.jpg',
      '/images/IMG-20250123-WA0020-r4.jpg',
      '/images/IMG-20250123-WA0016-r5.jpg'
    ],
    description: 'Luxurious radiance-focused lighting collection emphasizing brilliant illumination and sophisticated design elements.',
    longDescription: 'The Radiance Collection represents the pinnacle of illumination excellence, featuring five meticulously crafted pieces designed to maximize light output while maintaining elegant aesthetics. Each fixture incorporates advanced optical engineering to ensure optimal light distribution and minimal glare. The collection showcases premium materials including polished metals, precision-cut glass, and high-performance LED arrays. From intimate accent lighting to grand statement pieces, the Radiance Collection transforms any space with brilliant, beautiful light that enhances both functionality and ambiance.',
    specifications: [
      "Collection: 5 high-performance lighting pieces",
      "Materials: Polished metals, precision glass, premium LEDs",
      "Finish: Polished chrome with crystal accents",
      "LED Technology: High-output, full-spectrum illumination",
      "Power: 25W-80W depending on piece",
      "Light Output: Up to 8000 lumens per fixture",
      "Warranty: 7-year comprehensive coverage"
    ],
    features: [
      "Maximum light output optimization",
      "Full-spectrum LED illumination",
      "Precision optical engineering",
      "Glare-free light distribution",
      "Premium polished metal construction",
      "Crystal accent elements",
      "High-performance LED arrays",
      "Professional-grade illumination"
    ]
  },
  {
    id: 'quantum-line',
    name: 'Quantum Line',
    category: 'collection',
    price: '$179 - $799',
    images: [
      '/images/IMG-20250213-WA0011-q1.jpg',
      '/images/IMG-20250213-WA0017-q2.jpg',
      '/images/IMG-20250213-WA0007-q3.jpg',
      '/images/IMG-20250213-WA0015-q4.jpg',
      '/images/IMG-20250213-WA0013-q5.jpg'
    ],
    description: 'Futuristic quantum-inspired lighting line featuring cutting-edge technology and innovative design concepts.',
    longDescription: 'The Quantum Line pushes the boundaries of lighting design with five revolutionary pieces that incorporate quantum-inspired aesthetics and cutting-edge technology. Each fixture features unique geometric patterns that seem to shift and change as light passes through them, creating dynamic visual effects reminiscent of quantum phenomena. The collection utilizes advanced materials including quantum dot technology for enhanced color rendering and energy efficiency. With smart connectivity and adaptive lighting algorithms, the Quantum Line represents the future of intelligent illumination.',
    specifications: [
      "Collection: 5 quantum-inspired pieces",
      "Materials: Advanced polymers, quantum dot LEDs",
      "Technology: Quantum dot color enhancement",
      "LED Technology: Adaptive color temperature",
      "Power: 15W-50W depending on piece",
      "Connectivity: WiFi, Bluetooth, smart home integration",
      "Features: Dynamic light patterns and effects"
    ],
    features: [
      "Quantum-inspired geometric designs",
      "Dynamic light pattern effects",
      "Quantum dot LED technology",
      "Adaptive color temperature control",
      "Smart home integration",
      "Advanced polymer construction",
      "Energy-efficient operation",
      "Futuristic aesthetic appeal"
    ]
  },
  {
    id: 'prism-series',
    name: 'Prism Series',
    category: 'collection',
    price: '$159 - $699',
    images: [
      '/images/IMG-20250501-WA0021-p1.jpg',
      '/images/IMG-20250501-WA0020-p2.jpg',
      '/images/IMG-20250501-WA0018-p3.jpg',
      '/images/IMG-20250501-WA0015-p4.jpg',
      '/images/IMG-20250501-WA0009-p5.jpg'
    ],
    description: 'Prismatic lighting series featuring light refraction and spectrum effects for colorful and dynamic illumination.',
    longDescription: 'The Prism Series celebrates the beauty of light refraction and spectrum dispersion, featuring five distinctive pieces that transform ordinary illumination into spectacular light shows. Each fixture incorporates precision-cut prismatic elements that break white light into its component colors, creating rainbow effects and dynamic color patterns throughout the space. The collection combines artistic vision with optical science, resulting in lighting that is both functional and mesmerizing. Perfect for creative spaces, entertainment areas, or anywhere you want to add a touch of magic to your lighting design.',
    specifications: [
      "Collection: 5 prismatic light fixtures",
      "Materials: Precision-cut prisms, optical glass",
      "Effects: Light refraction and spectrum dispersion",
      "LED Technology: High-intensity white light sources",
      "Power: 20W-60W depending on piece",
      "Optical Elements: Multi-faceted prismatic components",
      "Installation: Adjustable mounting for optimal effects"
    ],
    features: [
      "Prismatic light refraction effects",
      "Spectrum dispersion and rainbow patterns",
      "Precision-cut optical components",
      "High-intensity LED light sources",
      "Adjustable mounting systems",
      "Dynamic color pattern creation",
      "Artistic and functional lighting",
      "Mesmerizing visual effects"
    ]
  },
  {
    id: 'orbit-collection',
    name: 'Orbit Collection',
    category: 'collection',
    price: '$189 - $899',
    images: [
      '/images/IMG-20250516-WA0016-o1.jpg',
      '/images/IMG-20250516-WA0012-o2.jpg',
      '/images/IMG-20250516-WA0004-o3.jpg',
      '/images/IMG-20250516-WA0002-o4.jpg',
      '/images/IMG-20250516-WA0006-o5.jpg'
    ],
    description: 'Orbital-inspired lighting collection featuring circular and spherical designs with rotating and dynamic elements.',
    longDescription: 'The Orbit Collection draws inspiration from planetary motion and celestial orbits, featuring five innovative pieces that incorporate circular and spherical design elements with dynamic movement capabilities. Each fixture features rotating or adjustable components that allow for customizable light direction and pattern creation. The collection combines kinetic design principles with modern lighting technology, creating fixtures that are both visually striking and highly functional. With smooth, silent operation and precision engineering, the Orbit Collection brings the elegance of celestial mechanics to interior lighting.',
    specifications: [
      "Collection: 5 orbital-inspired pieces",
      "Materials: Precision metals, kinetic components",
      "Movement: Rotating and adjustable elements",
      "LED Technology: Directional and ambient lighting",
      "Power: 22W-65W depending on piece",
      "Control: Manual and motorized adjustment options",
      "Operation: Silent precision movement"
    ],
    features: [
      "Orbital and planetary-inspired designs",
      "Rotating and adjustable components",
      "Kinetic lighting elements",
      "Directional and ambient illumination",
      "Silent precision movement",
      "Manual and motorized controls",
      "Customizable light patterns",
      "Celestial aesthetic appeal"
    ]
  },
  {
    id: 'nova-line',
    name: 'Nova Line',
    category: 'collection',
    price: '$149 - $599',
    images: [
      '/images/IMG-20250527-WA0035-n1.jpg',
      '/images/IMG-20250527-WA0033-n2.jpg',
      '/images/IMG-20250527-WA0039-n3.jpg',
      '/images/IMG-20250527-WA0037-n4.jpg',
      '/images/IMG-20250527-WA0036-n5.jpg'
    ],
    description: 'Explosive nova-inspired lighting line featuring burst patterns and radial designs for dramatic illumination effects.',
    longDescription: 'The Nova Line captures the explosive energy and radial beauty of stellar novae, featuring five dynamic pieces that create dramatic burst patterns and radial illumination effects. Each fixture incorporates multiple light sources arranged in explosive patterns that radiate outward from central points, mimicking the spectacular light shows of stellar explosions. The collection features adjustable intensity controls and pattern variations, allowing users to create everything from subtle ambient lighting to dramatic focal displays. With energy-efficient LED technology and artistic metalwork, the Nova Line brings cosmic drama to contemporary interiors.',
    specifications: [
      "Collection: 5 nova-inspired pieces",
      "Materials: Artistic metals, multiple LED arrays",
      "Patterns: Radial burst and explosive designs",
      "LED Technology: Multi-point illumination systems",
      "Power: 18W-55W depending on piece",
      "Control: Adjustable intensity and pattern settings",
      "Effects: Dramatic radial light projection"
    ],
    features: [
      "Nova and stellar explosion-inspired designs",
      "Radial burst light patterns",
      "Multi-point LED illumination",
      "Adjustable intensity controls",
      "Pattern variation settings",
      "Dramatic focal lighting effects",
      "Artistic metalwork construction",
      "Cosmic energy aesthetic"
    ]
  },
  {
    id: 'meridian-series',
    name: 'Meridian Series',
    category: 'collection',
    price: '$169 - $749',
    images: [
      '/images/IMG-20250606-WA0007-m1.jpg',
      '/images/IMG-20250606-WA0011-m2.jpg',
      '/images/IMG-20250606-WA0021-m3.jpg',
      '/images/IMG-20250606-WA0013-m4.jpg',
      '/images/IMG-20250606-WA0001-m5.jpg'
    ],
    description: 'Meridian-inspired lighting series featuring linear and directional designs for precise illumination control.',
    longDescription: 'The Meridian Series takes inspiration from navigational meridians and directional lines, featuring five precision-engineered pieces that offer exceptional control over light direction and distribution. Each fixture incorporates linear design elements and adjustable components that allow for precise beam shaping and directional lighting. The collection is perfect for task lighting, accent illumination, and architectural highlighting. With advanced optical systems and premium construction materials, the Meridian Series delivers professional-grade lighting performance in elegant, contemporary designs.',
    specifications: [
      "Collection: 5 directional lighting pieces",
      "Materials: Precision metals, optical components",
      "Design: Linear and meridian-inspired forms",
      "LED Technology: Directional beam control",
      "Power: 16W-48W depending on piece",
      "Beam Control: Adjustable focus and direction",
      "Applications: Task, accent, and architectural lighting"
    ],
    features: [
      "Meridian and linear-inspired designs",
      "Precision directional beam control",
      "Adjustable focus and direction",
      "Professional-grade optical systems",
      "Task and accent lighting optimization",
      "Architectural highlighting capabilities",
      "Premium construction materials",
      "Contemporary linear aesthetics"
    ]
  },
  {
    id: 'lumina-collection',
    name: 'Lumina Collection',
    category: 'collection',
    price: '$139 - $649',
    images: [
      '/images/IMG-20250616-WA0007-l1.jpg',
      '/images/IMG-20250616-WA0001-l2.jpg',
      '/images/IMG-20250616-WA0003-l4.jpg',
      '/images/IMG-20250616-WA0003-l4.jpg',
      '/images/IMG-20250616-WA0005-l5.jpg'
    ],
    description: 'Pure lumina-focused lighting collection emphasizing clean illumination and minimalist design principles.',
    longDescription: 'The Lumina Collection embodies the essence of pure light, featuring five minimalist pieces that prioritize clean illumination and understated elegance. Each fixture is designed to disappear into the architecture while providing exceptional light quality and distribution. The collection emphasizes simplicity, functionality, and the beauty of unadorned light. With high-efficiency LED technology and refined materials, the Lumina Collection offers sophisticated lighting solutions that enhance spaces without overwhelming them. Perfect for modern minimalist interiors and contemporary architectural settings.',
    specifications: [
      "Collection: 5 minimalist lighting pieces",
      "Materials: Refined metals, clean glass elements",
      "Design: Pure minimalist aesthetics",
      "LED Technology: High-efficiency, clean illumination",
      "Power: 14W-42W depending on piece",
      "Light Quality: High CRI, flicker-free operation",
      "Installation: Seamless architectural integration"
    ],
    features: [
      "Pure minimalist design philosophy",
      "Clean and unadorned illumination",
      "High-efficiency LED technology",
      "Seamless architectural integration",
      "High CRI light quality",
      "Flicker-free operation",
      "Refined material construction",
      "Understated elegance"
    ]
  }
];

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

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

  const openModal = (imageIndex: number) => {
    setModalImageIndex(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
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
              <div className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer" style={{ width: '680px', height: '716px', padding: '20px' }} onClick={() => openModal(currentImageIndex)}>
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  width={640}
                  height={676}
                  className="w-full h-full object-contain"
                />
                
                {/* Image Navigation Arrows */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all border border-gray-200 z-10"
                  style={{ width: '48px', height: '48px', padding: '8px' }}
                >
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all border border-gray-200 z-10"
                  style={{ width: '48px', height: '48px', padding: '8px' }}
                >
                  <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '216px' }}>{product.name}</h1>
                <p className="text-2xl font-semibold" style={{ color: '#d4af37', marginLeft: '216px' }}>{product.price}</p>
              </div>

              <div className="space-y-4" style={{ marginLeft: '216px' }}>
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
              <div className="flex gap-2" style={{ marginLeft: '216px' }}>
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
                <h3 className="text-xl font-semibold" style={{ color: '#91631D' }}>Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-base font-bold">
                  {product.longDescription}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#91631D' }}>Specifications</h3>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="text-gray-700 flex items-start font-bold">
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
                <h3 className="text-xl font-semibold" style={{ color: '#91631D' }}>Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 flex items-start font-bold">
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

      {/* Full-Screen Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Blurred Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${product.images[modalImageIndex]})`,
              filter: 'blur(20px)',
              transform: 'scale(1.1)'
            }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/50" />
          
          {/* Close Button - Outside modal content */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute bottom-4 right-4 z-20 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Modal Content */}
          <div 
            className="relative z-10 max-w-full max-h-full flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={product.images[modalImageIndex]}
              alt={product.name}
              width={1200}
              height={1200}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevModalImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={nextModalImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all backdrop-blur-sm border border-white/20"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {modalImageIndex + 1} / {product.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}