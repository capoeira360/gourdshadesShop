'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white font-sans text-[#333]">
      {/* BEGIN: HeroSection */}
      <section 
        className="relative h-[600px] flex items-center justify-start bg-cover bg-center" 
        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuCDEdPRU5Gz16kDgILqiGJzrLzABWLCBbnjFLjadOrwdkZNYXZ_BkmFlOUh1E0WZOEQyB8jwcGsPhn6bFUAbOrPM_QiArD1siAzvIfX0ArHqfkEWGAH7P8HSoOtZyNxWtToSmCDTlgXlgTHt93pCLRAmumjnmVkylVHwBc_LzL810p-cZ5Lgz1QGYXnL3X1bz3qcR7_Dr83e-iZP71Ohv7EVFnTpzrbfq8TVCz43YUlUuFdLCW2WaqPj2lelLg-x2Pt0YTISNybyyfd)' }}
        data-purpose="hero-section"
      >
        <div className="absolute inset-0 bg-black/50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-black/75 text-white p-10 rounded-lg max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 md:text-6xl">The Storyteller's Hand</h1>
            <p className="mb-8 text-lg">Every stitch, curve, and brushstroke is a word in a grander narrative. We are a sanctuary for their stories, a platform for their creations, and a home for creations born from passion and heritage.</p>
            <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-md hover:bg-brand-orange-dark transition-colors text-lg">
              Discover the Makers
            </Link>
          </div>
        </div>
      </section>
      {/* END: HeroSection */}

      {/* BEGIN: ArtisanJourneySection */}
      <section className="py-16 sm:py-24" data-purpose="artisan-journey">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-widest text-brand-dark sm:text-4xl mb-4">THE ARTISAN'S JOURNEY</h2>
              <p className="text-lg text-brand-text mb-8 max-w-xl mx-auto md:mx-0">
                Every stitch, curve, and brushstroke is a word in a grander narrative. We are a sanctuary for their stories, a platform for their creations, and a home for creations born from passion and heritage.
              </p>
              <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-md hover:bg-brand-orange-dark transition-colors text-lg">
                Meet Our Artisans
              </Link>
            </div>
            {/* Image */}
            <div className="flex justify-center">
              <img 
                alt="Artisan jewelry" 
                className="rounded-lg shadow-xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxy6-jajQCT_6FLDGvwTZqAYQUdT_qkt7zYCXBRdpiQVhAGd8_6Hgnp9EdK0qXDwXvgWWmW0I5OERVHESVzjhgh_pN7UhZWCLSxRHJgMWa3BbUeC1l7j0U1BRp-8EpGkeQox3wIwKWVqnMAKFF_YkbCDsi-tkeJTEl36GGHGVAxHVWcqL6sKRV2UwM2qzpxsH5GsYdOolT6TuFeAt9RGJd-O7Yhl8ytChNNb4QZ6iG7K2rPbVWbtWoG2O-FYiR04kYQcxR9BhM_ja1"
              />
            </div>
          </div>
        </div>
      </section>
      {/* END: ArtisanJourneySection */}

      {/* BEGIN: FeaturedCreationsSection */}
      <section className="bg-brand-gray py-16 sm:py-24" data-purpose="featured-creations">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-widest text-brand-dark sm:text-4xl text-center mb-12">FEATURED CREATIONS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Product Card 1 */}
            <div className="rounded-lg shadow-md overflow-hidden group bg-[#f9f9f9]">
              <img 
                alt="Handmade Pottery" 
                className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeJv8JV11JdYtgCh-Sfoqi1fbrsgKoZHHfAOkPTZwBuy-G76NJfMO-_Lm7SgMloHd3fvpafnX8RSo8KXjyGtioGsTDHy0f9b1xd9ehpwoGa7fP7mhdJwKxl2SW9rLrJjdbyd4JXVEJChSIj1cEPDzihk-DIqQQ2poPftG6lMAYkDd3lpltg03lypToFwibNiI_Er-06rVWekY-kzfqWrW-mdWaEk3ov0swekVZq13Z-TlaXHk05jxi4dJemvYUtKjgUHnmsjbounv4"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-brand-dark">Handmade Pottery</h3>
                <p className="text-gray-500 mb-4">Ceramics</p>
                <Link href="#" className="text-brand-orange font-medium hover:underline">Shop the Story - $XX.XX</Link>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="rounded-lg shadow-md overflow-hidden group bg-[#f9f9f9]">
              <img 
                alt="Handmade Potter" 
                className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhN-19StFM36YH689hRvXo1mrjQ1VFLQmHrqJ-dZ2BYOcQtLRmly6BqgcxcFIRmgtArRYlx9z27tlIcBD-KjXhpzE6jZ3_U0lp99qsdNzrjwDiO51p7HhV3TwHH7SSafA8yFCb9_FI20e7cWmyt0LtFwontXu1IKm34B4_cW_SarOvNP11KI9hXju5fGC6vOqSiCBRyoy-k77AJlrHTYwWOXvO9sb6jfYhbxwAZMEqbHNwNJ-5hjj6dsUh4zQd_qZ9uuUlBiHpW2cO"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-brand-dark">Handmade Potter</h3>
                <p className="text-gray-500 mb-4">Ceramics</p>
                <Link href="#" className="text-brand-orange font-medium hover:underline">Shop the Story - $XX.XX</Link>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="rounded-lg shadow-md overflow-hidden group bg-[#f9f9f9]">
              <img 
                alt="Handmade Cotam" 
                className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsIBcfK8Fp-m2dbVJcwbw6bcwolzrD2roJiuYWs2Wkz_vQ3H7SzdoGcrVk7xllkYF3Z2Dldjxey_MbDf5dEL4b6SGTVD1ut_u8cksaIOwYweOfSdluvrs_aVCXnwTuJdfA7ICy-dN3plCp-284zaEGoAYWWVYVNOfjsI_IEaeHgL0NuQdyw2iJDGVyGtVTQ57SFJOhmqEwxXRb-rMUeq9yiEPCEp2bamSdwN5BplZwnEIiPB-GATvdRKdwqr1U5GA7Y3cGKnoZfqss"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-brand-dark">Handmade Cotam</h3>
                <p className="text-gray-500 mb-4">Ceramics</p>
                <Link href="#" className="text-brand-orange font-medium hover:underline">Shop the Story - $XX.XX</Link>
              </div>
            </div>
            {/* Product Card 4 */}
            <div className="rounded-lg shadow-md overflow-hidden group bg-[#f9f9f9]">
              <img 
                alt="Handmade Cotten" 
                className="w-full h-64 object-cover group-hover:opacity-90 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDze8J6T3-IYtgflxWoz7yCGeu3POCHvZsg8lGpgF8I2OmbaCPJTwCR4Z6CDQgjjKGGwv7AhEYkYpvcqyYeshhRbi8NIjDp8ire8LjC4cFegPkIbC2tEqZW0JoYe_de90fCt2Pp9v4xSFl0XAevJP-7PqVWIcNTudAhzD0f73j_JvQPzTu_qrr68R6rlBluNS1fPVHCLI0FKzkJ4_Smow3uO_L8Jo1JHx0DzJV3YyTGwVSKyi2chZ-MSQa7vv-yf0gzndGiCNI5VE0y"
              />
              <div className="p-6 text-center">
                <h3 className="font-semibold text-lg text-brand-dark">Handmade Cotten</h3>
                <p className="text-gray-500 mb-4">Creamics</p>
                <Link href="#" className="text-brand-orange font-medium hover:underline">Shop the Story - $XX.XX</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: FeaturedCreationsSection */}

      {/* BEGIN: CategorySection */}
      <section className="py-16 sm:py-24" data-purpose="category-showcase">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Earthenware & Pottery Category */}
            <div 
              className="relative rounded-lg min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuBW1JIf6u1yDHod31otjNchEO5-EsrdYW2_VlrkBHWCeWrNE7xEVrP2wd4PzJL3uHsbEXYfIqvRcaiyGqQEGFjHljeFGpSxqUu57VZee1nEF7OZXLRN6S2BzgxiQUF5xBdG4I8KT6NUGpXjL7aW37z2EmosmwrWaahhgOQhG9JRtaHstGtBzzVy7Th6kp2XhCkDq0Qshi484Et5Q67yTxKNcTSLA8giF7NATv1J8dvDthxXRAz2JUsqrLuYIbOJUSTawrqky1zJwb1d)' }}
            >
              <div className="absolute inset-0 bg-black/40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Earthenware & Pottery</h3>
                <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-md hover:bg-brand-orange-dark transition-colors text-lg">
                  Explore the Collection
                </Link>
              </div>
            </div>
            {/* Woven Textiles Category */}
            <div 
              className="relative rounded-lg min-h-[400px] flex items-center justify-center text-white text-center p-8 overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuDwegxkQ-8ip-nJ_Ym5c2IV733NZlrKJ-somy2Pq__G9oOwZMPnz6Nr-4H5tCBi3SeUHKSBGbYqZolX996hm7CutHECUSiESswUT_dikmOX2NipMXmu_Qp4UiY8-vziZz9WbuICCeVsLNQ5_aNdUvXLtPUo9O6UHVbTM2OIx3tF898XmiIN2_QauSNs76SbHC5I9f_LdRcZw09nvNwCgEBH8Yg7GhGQZ5bk_hV2S7hS6OGf-D9YZPSwONKWqeMFebmfhMqvE2OcYHCr)' }}
            >
              <div className="absolute inset-0 bg-black/40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold mb-6">Woven Textiles</h3>
                <Link href="#" className="inline-block bg-brand-orange text-white font-bold py-3 px-8 rounded-md hover:bg-brand-orange-dark transition-colors text-lg">
                  Explore the Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END: CategorySection */}
    </div>
  );
}
