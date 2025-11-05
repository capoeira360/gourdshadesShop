"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PriceDisplay from '@/components/PriceDisplay';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useWishlist } from '@/contexts/WishlistContext';

type Product = {
  id: string;
  name: string;
  category: string;
  price: string;
  images: string[];
  description?: string;
  longDescription?: string;
  specifications: string[];
  features: string[];
};

export default function ProductDetailClient({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const { addItem } = useEnquiry();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToEnquiry = () => {
    const priceString = product.price.replace('$', '');
    const priceNumber = parseFloat(priceString.split(' - ')[0]);
    const itemToAdd = {
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: product.images[0],
      category: product.category,
    };
    addItem(itemToAdd);
  };

  const handleWishlistToggle = () => {
    const priceString = product.price.replace('$', '');
    const priceNumber = parseFloat(priceString.split(' - ')[0]);
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: priceNumber,
      image: product.images[0],
      category: product.category,
    };
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

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
      <div className="max-w-6xl mx-auto px-4" style={{ paddingLeft: '0rem', paddingRight: '0rem' }}>
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

        <div className="bg-white rounded-lg shadow-sm p-8 mb-8" style={{ width: 'calc(100% + 72px)', height: 'calc(644px + 72px + 64px)' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div
                className="relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer w-full h-[55vh] sm:h-[560px] p-5"
                onClick={() => openModal(currentImageIndex)}
              >
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  width={640}
                  height={676}
                  className="w-full h-full object-contain"
                />

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

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:ml-0">
              <div>
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">{product.category}</p>
                <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>{product.name}</h1>
                <PriceDisplay
                  price={product.price}
                  className="text-2xl font-semibold"
                  style={{ color: '#786861' }}
                />
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleAddToEnquiry}
                  className="text-white py-3 px-6 rounded-lg font-semibold transition-colors hover:opacity-90 w-full sm:w-80"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                >
                  Add to Enquiry
                </button>
                <button
                  onClick={handleWishlistToggle}
                  className="border-2 py-3 px-6 rounded-lg font-semibold transition-colors hover:text-white w-full sm:w-80"
                  style={{
                    borderColor: 'var(--color-primary)',
                    color: isInWishlist(product.id) ? 'white' : 'var(--color-primary)',
                    backgroundColor: isInWishlist(product.id) ? 'var(--color-primary)' : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--color-primary)';
                    }
                  }}
                >
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? 'border-gray-800 scale-105 shadow-md' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Image src={image} alt={`${product.name} ${index + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm" style={{ width: 'calc(100% + 72px)' }}>
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'description' ? 'text-gray-900 border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'specifications' ? 'text-gray-900 border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'features' ? 'text-gray-900 border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Features
              </button>
            </nav>
          </div>

          <div className="p-8 pb-16">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#91631D', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-base font-bold">{product.longDescription}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#91631D', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>Specifications</h3>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="text-gray-700 flex items-start font-bold">
                      <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#d4af37' }}></span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#91631D', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>Key Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-700 flex items-start font-bold">
                      <span className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{ backgroundColor: '#d4af37' }}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={closeModal}>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${product.images[modalImageIndex]})`, filter: 'blur(20px)', transform: 'scale(1.1)' }}
          />
          <div className="absolute inset-0 bg-black/50" />
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
          <div className="relative z-10 max-w-full max-h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <Image src={product.images[modalImageIndex]} alt={product.name} width={1200} height={1200} className="max-w-full max-h-[90vh] object-contain" />
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
              {modalImageIndex + 1} / {product.images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
