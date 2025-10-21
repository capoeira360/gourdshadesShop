'use client';

import { useEffect } from 'react';
import Intro from "@/components/Intro";
import NewImageSlider from "@/components/NewImageSlider";

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
        
        {/* New Image Slider Section */}
        <NewImageSlider />
      </main>
    </div>
  );
}
