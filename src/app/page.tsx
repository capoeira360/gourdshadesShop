'use client';

import { useEffect } from 'react';
import Intro from "@/components/Intro";

export default function Home() {
  useEffect(() => {
    console.log('Home: Component mounted');
    
    // Remove conflicting scroll container setup
    document.body.style.overflow = '';
    
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div>
      <main className="min-h-screen">
        <Intro />
        
        {/* Additional content for scroll demonstration */}
        <section className="py-24 px-6 bg-gray-50 min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-light text-gray-800 mb-12">
              Crafted with Precision
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Every piece in our collection represents the perfect balance of form and function, 
              designed to transform your space into something extraordinary.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
