'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  images: string[];
  description: string;
  longDescription: string;
  specifications: {
    dimensions: string;
    material: string;
    bulbType: string;
    wattage: string;
    voltage: string;
    warranty: string;
  };
  features: string[];
  inStock: boolean;
}

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div 
        className="aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(true)}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={images[selectedImage]}
          alt={`${productName} - Image ${selectedImage + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-5 gap-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            className={`aspect-square bg-gray-50 rounded-md overflow-hidden border-2 transition-all duration-200 ${
              selectedImage === index ? 'border-primary' : 'border-transparent hover:border-gray-300'
            }`}
            onClick={() => setSelectedImage(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
          >
            <motion.img
              src={images[selectedImage]}
              alt={`${productName} - Zoomed`}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              onClick={() => setIsZoomed(false)}
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  const headerRef = useRef<HTMLDivElement>(null);

  // Extended product data with multiple images
  const products: Product[] = [
    {
      id: '1',
      name: 'Aurora Minimalist Pendant',
      category: 'pendant',
      price: '$329',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iODAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iNjAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIyMCIgcj0iNzAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE5MCIgcj0iOTAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIxMCIgcj0iNTAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K'
      ],
      description: 'Sleek brushed aluminum pendant with warm LED technology, perfect for modern kitchens and dining areas.',
      longDescription: 'The Aurora Minimalist Pendant represents the perfect fusion of contemporary design and advanced LED technology. Crafted from premium brushed aluminum with a satin finish, this pendant light delivers both style and substance. The integrated warm LED array provides 3000K color temperature for comfortable ambient lighting, while the precision-engineered diffuser ensures even light distribution without glare. Ideal for kitchen islands, dining tables, or any space requiring focused yet elegant illumination.',
      specifications: {
        dimensions: '14" W x 10" H',
        material: 'Brushed Aluminum with Satin Finish',
        bulbType: 'Integrated LED (Non-replaceable)',
        wattage: '24W LED (equivalent to 150W incandescent)',
        voltage: '120V AC',
        warranty: '5 Years Limited'
      },
      features: [
        'Integrated warm LED technology (3000K)',
        'Dimmable with compatible LED dimmer switches',
        'Adjustable cord length up to 72 inches',
        'Tool-free installation with included canopy',
        'Energy Star certified for efficiency',
        'Suitable for sloped ceilings up to 45 degrees'
      ],
      inStock: true
    },
    {
      id: '6',
      name: 'Hexagon Geometric Pendant',
      category: 'pendant',
      price: '$279',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDE1MCAyNDAsMTcwIDI0MCwyMTAgMjAwLDIzMCAxNjAsMjEwIDE2MCwxNzAiIGZpbGw9IiNEQkI0MkMiLz4KPHJlY3QgeD0iMTk1IiB5PSIxMDAiIHdpZHRoPSIxMCIgaGVpZ2h0PSI1MCIgZmlsbD0iIzRBNDU0QiIvPgo8L3N2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDE0NSAyNDUsMTY1IDI0NSwyMTUgMjAwLDIzNSAxNTUsMjE1IDE1NSwxNjUiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDE1NSAyMzUsMTc1IDIzNSwyMDUgMjAwLDIyNSAxNjUsMjA1IDE2NSwxNzUiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDE0OCAyNDIsMTY4IDI0MiwyMTIgMjAwLDIzMiAxNTgsMjEyIDE1OCwxNjgiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+Cjxwb2x5Z29uIHBvaW50cz0iMjAwLDE1MCAyNDAsMTcwIDI0MCwyMTAgMjAwLDIzMCAxNjAsMjEwIDE2MCwxNzAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K'
      ],
      description: 'Modern hexagonal pendant light in brushed brass with geometric design, perfect for kitchen islands or dining areas.',
      longDescription: 'The Hexagon Geometric Pendant brings contemporary sophistication to any space with its striking hexagonal silhouette. Crafted from premium brushed brass with a satin finish, this pendant light creates beautiful geometric shadows while providing excellent task lighting. The clean lines and modern aesthetic make it perfect for kitchen islands, dining tables, or as a statement piece in living areas. The adjustable cord length allows for customized installation height.',
      specifications: {
        dimensions: '12" W x 10" H x 12" D',
        material: 'Brushed Brass with Satin Finish',
        bulbType: 'E26 Base - LED or Incandescent',
        wattage: '75W Max (15W LED recommended)',
        voltage: '120V AC',
        warranty: '2 Years Limited'
      },
      features: [
        'Striking hexagonal geometric design',
        'Premium brushed brass construction',
        'Adjustable cord length up to 72 inches',
        'Creates beautiful geometric light patterns',
        'Perfect for kitchen islands and dining areas',
        'Compatible with dimmer switches'
      ],
      inStock: true
    },
    {
      id: '7',
      name: 'Lumina Modern Chandelier',
      category: 'chandelier',
      price: '$899',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTYwIiBjeT0iMjAwIiByPSIyMCIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyNDAiIGN5PSIyMDAiIHI9IjIwIiBmaWxsPSIjREJCNDJDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjI0MCIgcj0iMjAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE3NSIgcj0iNDUiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTU1IiBjeT0iMTk1IiByPSIyNSIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyNDUiIGN5PSIxOTUiIHI9IjI1IiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4NSIgcj0iMzUiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTY1IiBjeT0iMjA1IiByPSIxNSIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyMzUiIGN5PSIyMDUiIHI9IjE1IiBmaWxsPSIjREJCNDJDIi8+Cjwvc3ZnPgo=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE3OCIgcj0iNDIiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTU4IiBjeT0iMTk4IiByPSIyMiIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyNDIiIGN5PSIxOTgiIHI9IjIyIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iNDAiIGZpbGw9IiNEQkI0MkMiLz4KPGNpcmNsZSBjeD0iMTYwIiBjeT0iMjAwIiByPSIyMCIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyNDAiIGN5PSIyMDAiIHI9IjIwIiBmaWxsPSIjREJCNDJDIi8+Cjwvc3ZnPgo='
      ],
      description: 'Contemporary multi-light chandelier with sleek chrome finish and frosted glass globes for elegant ambient lighting.',
      longDescription: 'The Lumina Modern Chandelier redefines contemporary elegance with its sophisticated multi-light design. Featuring six frosted glass globes suspended from a sleek chrome frame, this chandelier provides abundant ambient lighting while serving as a stunning focal point. The minimalist design incorporates clean lines and premium materials, making it perfect for dining rooms, living areas, or entryways. Each globe houses an individual bulb, allowing for customizable lighting levels when paired with compatible dimmer switches.',
      specifications: {
        dimensions: '28" W x 18" H x 28" D',
        material: 'Chrome Frame with Frosted Glass Globes',
        bulbType: '6 x E12 Candelabra Base - LED Compatible',
        wattage: '40W Max per bulb (240W total)',
        voltage: '120V AC',
        warranty: '3 Years Limited'
      },
      features: [
        'Six frosted glass globes for even light distribution',
        'Premium chrome finish with corrosion resistance',
        'Adjustable chain length for custom installation',
        'Compatible with dimmer switches for ambiance control',
        'Perfect for dining rooms and living spaces',
        'Easy installation with included mounting hardware'
      ],
      inStock: true
    },
    {
      id: '3',
      name: 'Brooklyn Industrial Sconce',
      category: 'sconce',
      price: '$249',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE4MCIgeT0iMTUwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREJCNDJDIi8+CjxyZWN0IHg9IjE3MCIgeT0iMTQwIiB3aWR0aD0iNjAiIGhlaWdodD0iMjAiIGZpbGw9IiM0QTQ1NEIiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxyZWN0IHg9IjE3NSIgeT0iMTQ1IiB3aWR0aD0iNTAiIGhlaWdodD0iMTEwIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxyZWN0IHg9IjE4NSIgeT0iMTU1IiB3aWR0aD0iMzAiIGhlaWdodD0iOTAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxyZWN0IHg9IjE3MCIgeT0iMTQwIiB3aWR0aD0iNjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+CjxyZWN0IHg9IjE4MCIgeT0iMTUwIiB3aWR0aD0iNDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K'
      ],
      description: 'Vintage-inspired wall sconce with aged brass finish and Edison bulb compatibility for authentic industrial charm.',
      longDescription: 'The Brooklyn Industrial Sconce captures the raw beauty of New York\'s industrial heritage. Featuring an authentic aged brass finish that develops character over time, this wall-mounted fixture is designed to accommodate vintage Edison bulbs for that perfect warm glow. The robust construction includes a heavy-duty mounting bracket and weather-resistant finish, making it suitable for both indoor and covered outdoor applications. Perfect for lofts, restaurants, or any space seeking authentic industrial character.',
      specifications: {
        dimensions: '8" W x 12" H x 6" D',
        material: 'Aged Brass with Steel Construction',
        bulbType: 'Edison E26 Base - LED Compatible',
        wattage: '60W Max per bulb',
        voltage: '120V AC',
        warranty: '2 Years Limited'
      },
      features: [
        'Authentic aged brass finish with natural patina',
        'Compatible with vintage Edison and LED bulbs',
        'Heavy-duty steel construction for durability',
        'Suitable for indoor and covered outdoor use',
        'Easy wall mounting with included hardware',
        'Adjustable shade for directional lighting'
      ],
      inStock: true
    },
    {
      id: '4',
      name: 'Artisan Ceramic Table Lamp',
      category: 'table',
      price: '$189',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE5NSIgeT0iMjAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEE0NTRCIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNjAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjREJCNDJDIi8+CjxyZWN0IHg9IjE3MCIgeT0iMzAwIiB3aWR0aD0iNjAiIGhlaWdodD0iMTAiIGZpbGw9IiM0QTQ1NEIiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxyZWN0IHg9IjE5MCIgeT0iMTk1IiB3aWR0aD0iMjAiIGhlaWdodD0iMTEwIiBmaWxsPSIjNEE0NTRCIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTUiIHJ4PSI2NSIgcnk9IjQ1IiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxyZWN0IHg9IjE5OCIgeT0iMjA1IiB3aWR0aD0iNCIgaGVpZ2h0PSI5MCIgZmlsbD0iIzRBNDU0QiIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTY1IiByeD0iNTUiIHJ5PSIzNSIgZmlsbD0iI0RCQjQyQyIvPgo8L3N2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxyZWN0IHg9IjE5MyIgeT0iMTk4IiB3aWR0aD0iMTQiIGhlaWdodD0iMTA0IiBmaWxsPSIjNEE0NTRCIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTgiIHJ4PSI2OCIgcnk9IjQyIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+CjxyZWN0IHg9IjE5NSIgeT0iMjAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNEE0NTRCIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNjAiIHJ4PSI2MCIgcnk9IjQwIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K'
      ],
      description: 'Hand-thrown ceramic base in matte white glaze with natural linen drum shade, perfect for bedside or living room.',
      longDescription: 'The Artisan Ceramic Table Lamp showcases the beauty of handcrafted pottery combined with modern lighting design. Each ceramic base is individually hand-thrown by skilled artisans, ensuring unique character and subtle variations that make every piece one-of-a-kind. The matte white glaze provides a clean, contemporary finish that complements any decor style. Topped with a premium natural linen drum shade that diffuses light beautifully, creating warm, ambient lighting perfect for reading or relaxation.',
      specifications: {
        dimensions: '16" W x 24" H (with shade)',
        material: 'Hand-thrown Ceramic with Matte White Glaze',
        bulbType: 'Standard E26 Base - LED Recommended',
        wattage: '100W Max (25W LED recommended)',
        voltage: '120V AC',
        warranty: '1 Year Limited'
      },
      features: [
        'Hand-thrown ceramic base with unique character',
        'Premium natural linen drum shade included',
        'Matte white glaze finish resists fingerprints',
        'Weighted base for stability and safety',
        'In-line dimmer switch on cord',
        'Perfect for bedside, living room, or office use'
      ],
      inStock: true
    },
    {
      id: '5',
      name: 'Meridian Arc Floor Lamp',
      category: 'floor',
      price: '$449',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxyZWN0IHg9IjE5NSIgeT0iMTAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEE0NTRCIi8+CjxyZWN0IHg9IjE2MCIgeT0iODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0RCQjQyQyIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIzMjAiIHI9IjMwIiBmaWxsPSIjNEE0NTRCIi8+Cjwvc3ZnPgo=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxyZWN0IHg9IjE5MCIgeT0iOTUiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMTAiIGZpbGw9IiM0QTQ1NEIiLz4KPHJlY3QgeD0iMTU1IiB5PSI3NSIgd2lkdGg9IjkwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxyZWN0IHg9IjE5OCIgeT0iMTA1IiB3aWR0aD0iNCIgaGVpZ2h0PSIxOTAiIGZpbGw9IiM0QTQ1NEIiLz4KPHJlY3QgeD0iMTY1IiB5PSI4NSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjREJCNDJDIi8+Cjwvc3ZnPgo=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxyZWN0IHg9IjE5MyIgeT0iOTgiIHdpZHRoPSIxNCIgaGVpZ2h0PSIyMDQiIGZpbGw9IiM0QTQ1NEIiLz4KPHJlY3QgeD0iMTU4IiB5PSI3OCIgd2lkdGg9Ijg0IiBoZWlnaHQ9IjQ0IiBmaWxsPSIjREJCNDJDIi8+KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+CjxyZWN0IHg9IjE5NSIgeT0iMTAwIiB3aWR0aD0iMTAiIGhlaWdodD0iMjAwIiBmaWxsPSIjNEE0NTRCIi8+CjxyZWN0IHg9IjE2MCIgeT0iODAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0RCQjQyQyIvPgo8L3N2Zz4K'
      ],
      description: 'Contemporary arc floor lamp with marble base and adjustable LED spotlight, ideal for reading corners.',
      longDescription: 'The Meridian Arc Floor Lamp combines sculptural elegance with practical functionality. Featuring a genuine Carrara marble base that provides both stability and luxury, this floor lamp\'s graceful arc design allows the adjustable LED spotlight to reach over furniture for perfect task lighting. The brushed steel construction ensures durability while maintaining a sleek, contemporary aesthetic. The integrated LED technology provides bright, focused illumination perfect for reading, crafting, or accent lighting.',
      specifications: {
        dimensions: '65" H x 48" Reach x 12" Base',
        material: 'Carrara Marble Base with Brushed Steel Arm',
        bulbType: 'Integrated LED Spotlight (Non-replaceable)',
        wattage: '12W LED (equivalent to 75W halogen)',
        voltage: '120V AC',
        warranty: '3 Years Limited'
      },
      features: [
        'Genuine Carrara marble base for stability and luxury',
        'Adjustable LED spotlight with 360-degree rotation',
        'Brushed steel construction with corrosion resistance',
        'Integrated dimmer switch on the base',
        'Perfect arc reach for over-furniture lighting',
        'Energy-efficient LED technology with 50,000-hour lifespan'
      ],
      inStock: true
    },
    {
      id: '2',
      name: 'Venetian Crystal Chandelier',
      category: 'chandelier',
      price: '$1,899',
      images: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE4MCIgcj0iNjAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNzAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkFGQUZBIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iNTAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOEY4Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE3MCIgcj0iODAiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRkNGQ0ZDIi8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE5MCIgcj0iNjUiIGZpbGw9IiNEQkI0MkMiLz4KPHN2Zz4K'
      ],
      description: 'Hand-cut Bohemian crystal chandelier with chrome finish, featuring 9 candelabra lights for grand spaces.',
      longDescription: 'Experience the epitome of luxury with our Venetian Crystal Chandelier. This magnificent piece features authentic Bohemian crystal elements, each hand-cut and polished to perfection. The chrome-plated steel frame provides both strength and elegance, while the nine candelabra-style lights create a warm, inviting ambiance. Each crystal is strategically positioned to maximize light refraction, creating a dazzling display that transforms any room into a sophisticated space worthy of the finest European palaces.',
      specifications: {
        dimensions: '28" W x 32" H (adjustable)',
        material: 'Bohemian Crystal & Chrome-plated Steel',
        bulbType: 'Candelabra Base (E12) - LED Compatible',
        wattage: '540W Max (9 x 60W bulbs)',
        voltage: '120V AC',
        warranty: '3 Years Limited'
      },
      features: [
        'Authentic hand-cut Bohemian crystal elements',
        'Chrome-plated steel frame with lifetime finish',
        'Adjustable chain length (24" to 72")',
        'Compatible with standard dimmer switches',
        'Professional installation service available',
        'Includes all mounting hardware and detailed instructions'
      ],
      inStock: true
    },
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === params.id);
    setProduct(foundProduct || null);
    console.log("Product found:", foundProduct);
    console.log("Product longDescription:", foundProduct?.longDescription);
  }, [params.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeaderVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-gray-600 mb-4">Product not found</h1>
          <Link href="/products">
            <motion.button
              className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Products
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-primary">{product.name}</span>
        </nav>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageGallery images={product.images} productName={product.name} />
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div
            ref={headerRef}
            className="space-y-8"
            variants={headerVariants}
            initial="hidden"
            animate={isHeaderVisible ? "visible" : "hidden"}
          >
            {/* Product Header */}
            <div>
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs uppercase tracking-wider rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                {product.description}
              </p>
              <div className="flex items-center justify-between mb-8">
                <span className="text-5xl font-bold text-amber-600">
                  {product.price}
                </span>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className="flex-1 px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!product.inStock}
                whileHover={{ scale: product.inStock ? 1.02 : 1 }}
                whileTap={{ scale: product.inStock ? 0.98 : 1 }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-white transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Us
              </motion.button>
            </div>

            {/* Product Information Tabs */}
            <div className="border-t pt-8">
              <div className="flex space-x-8 mb-6">
                {(['description', 'specifications', 'features'] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`pb-2 border-b-2 transition-colors capitalize ${
                      activeTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-600 hover:text-primary'
                    }`}
                    onClick={() => setActiveTab(tab as 'description' | 'specifications' | 'features')}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Product Information Tabs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                  {['description', 'specifications', 'features'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-6 py-4 text-sm font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-primary border-b-2 border-primary bg-gray-50'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-8 min-h-[300px]">
                  {activeTab === 'description' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Product Description
                      </h3>
                      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                        {product.longDescription}
                      </div>
                    </div>
                  )}

                  {activeTab === 'specifications' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                            <span className="font-medium text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="text-gray-900 font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'features' && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                        Key Features
                      </h3>
                      <ul className="space-y-4">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="w-6 h-6 text-primary mt-0.5 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-lg leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-primary mb-4">
              You Might Also Like
            </h2>
            <p className="text-gray-600">
              Explore more products from our collection
            </p>
          </div>
          <div className="flex justify-center">
            <Link href="/products">
              <motion.button
                className="px-8 py-4 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Products
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;