'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { useWishlist } from '@/contexts/WishlistContext';
import PriceDisplay from '@/components/PriceDisplay';

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
    id: 'artisan-series',
    name: 'Tembo/Twiga savana',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20240405_131741-a1.jpg',
      '/images/20240405_131752-a2.jpg',
      '/images/20240405_132015-a3.jpg',
      '/images/20240405_132238-a4.jpg',
      '/images/20240408_112214-a5.jpg'
    ],
    description: 'Handcrafted lighting featuring herbivores animals in the savanna, artisanal techniques with contemporary design from natural materials.',
    longDescription: 'The Tembo/Twiga savana piece showcases the majestic beauty of African wildlife through intricate handcrafted gourd artistry. This unique lamp features detailed depictions of elephants (Tembo) and giraffes (Twiga) in their natural savanna habitat, created using traditional calabash crafting techniques passed down through generations. Each piece tells a story of the African wilderness, with carefully carved details that come alive when illuminated, casting beautiful shadow patterns that dance across your walls.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'bronze-collection',
    name: 'Spackle blue/red',
    category: 'piece',
    price: '$120 - $150',
    images: [
      '/images/20240508_141055-b1.jpg',
      '/images/20240508_141122-b2.jpg',
      '/images/20240508_141338-b3.jpg',
      '/images/20240508_141359-b4.jpg',
      '/images/20240508_141454-b5.jpg'
    ],
    description: 'Sophisticated abstract lighting combining Crystal beads elegance with modern patterns and timeless appeal.',
    longDescription: 'The Spackle blue/red piece represents a perfect fusion of abstract artistry and functional lighting. This sophisticated lamp features an intricate pattern of blue and red crystal beads that create mesmerizing light patterns when illuminated. The abstract design allows for personal interpretation while maintaining universal appeal, making it a perfect conversation piece for any modern interior.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Blue/red crystal beads",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'crystal-line',
    name: 'Natural African woman',
    category: 'piece',
    price: '$150 - $180',
    images: [
      '/images/20240520_160914-c1.jpg',
      '/images/20240520_161245-c2.jpg',
      '/images/20240520_161300-c3.jpg',
      '/images/20240520_161309-c4.jpg',
      '/images/20240520_161319-c5.jpg'
    ],
    description: 'Elegant crystal beads and three sides showing different aspects of African woman featuring prismatic effects and luxurious multi-tier designs for sophisticated spaces.',
    longDescription: 'The Natural African woman piece celebrates the beauty, strength, and grace of African femininity through three distinct artistic perspectives. Each side of this elegant lamp showcases a different aspect of womanhood, adorned with carefully placed crystal beads that create stunning prismatic effects when lit. This piece serves as both a lighting fixture and a tribute to the diverse beauty of African women.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Blue/red beads",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'designer-collection',
    name: 'Trees for life',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20240607_162317-d1.jpg',
      '/images/20240607_162627-d2.jpg',
      '/images/20240607_162641-d3.jpg',
      '/images/20240607_162656-d4.jpg',
      '/images/20240607_162743-d5.jpg'
    ],
    description: 'Three different trees on different sides, together with blue/purple crystal beads. very unique pattern design.',
    longDescription: 'The Trees for life piece represents the interconnectedness of nature and the vital role trees play in our ecosystem. This unique lamp features three different tree species on different sides, each complemented by blue and purple crystal beads that represent the life-giving elements of water and sky. The design celebrates biodiversity and environmental consciousness while providing beautiful ambient lighting.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Blue/purple crystal beads",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'essence-series',
    name: 'Twiga mugshot',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20240612_135043-e1.jpg',
      '/images/20240612_135118-e2.jpg',
      '/images/20240612_135256-e3.jpg',
      '/images/20240612_135313-e4.jpg',
      '/images/20240612_140355-e5.jpg'
    ],
    description: 'A giraffe shown on three different perspectives. Minimalist to Art Deco inspired lighting with clean and architectural presence for contemporary spaces.',
    longDescription: 'The Twiga mugshot piece captures the elegant beauty of the giraffe from three distinct perspectives, showcasing the grace and majesty of this iconic African animal. The minimalist approach to the design, inspired by Art Deco aesthetics, creates clean lines and architectural presence that fits perfectly in contemporary spaces while honoring traditional African wildlife artistry.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'fusion-line',
    name: 'The wild sunset',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20240614_140132-f2.jpg',
      '/images/20240614_140159-f3.jpg',
      '/images/20240614_140218-f4.jpg',
      '/images/20240614_135944-f5.jpg',
      '/images/20240614_140121-f5.jpg'
    ],
    description: 'The mix of all the animals herbivores and carnivores on a beautiful sunset of the savanna. The design includes large to small animals.',
    longDescription: 'The wild sunset piece captures the dramatic beauty of an African savanna at golden hour, featuring a comprehensive ecosystem of both herbivores and carnivores in their natural habitat. This intricate design showcases animals of all sizes, from the mighty elephant to the smallest antelope, all set against the backdrop of a stunning savanna sunset. The piece tells the complete story of African wildlife in perfect harmony.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'stellar-series',
    name: 'Fallen leaves 2.0',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/IMG-20241116-WA0036-s1.jpg',
      '/images/IMG-20241116-WA0032-s2.jpg',
      '/images/IMG-20241116-WA0024-s3.jpg',
      '/images/IMG-20241116-WA0016-s4.jpg',
      '/images/IMG-20241116-WA0014-s5.jpg'
    ],
    description: 'Contemporary plant leaves-inspired lighting featuring cosmic designs and celestial aesthetics for modern spaces.',
    longDescription: 'Fallen leaves 2.0 represents the evolution of natural design, combining the organic beauty of fallen autumn leaves with contemporary artistic interpretation. This piece captures the delicate patterns and textures of leaves in their final stage of beauty, creating a meditation on the cycles of nature and the beauty found in transition.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'radiance-collection',
    name: 'The five mugshots',
    category: 'piece',
    price: '$200 - $250',
    images: [
      '/images/IMG-20250123-WA0028-r1.jpg',
      '/images/IMG-20250123-WA0026-r2.jpg',
      '/images/IMG-20250123-WA0022-r3.jpg',
      '/images/IMG-20250123-WA0020-r4.jpg',
      '/images/IMG-20250123-WA0016-r5.jpg'
    ],
    description: 'The big five of the animal kingdom displaying their faces all around the lamp emphasizing brilliant illumination and sophisticated design elements.',
    longDescription: 'The five mugshots piece celebrates Africa\'s legendary "Big Five" - the lion, leopard, rhinoceros, elephant, and Cape buffalo. Each animal\'s face is prominently featured around the lamp, creating a powerful tribute to these magnificent creatures. This larger piece commands attention and serves as a statement of respect for African wildlife conservation.',
    specifications: [
      "Dimensions: Various sizes available (35\"- 40\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'quantum-line',
    name: 'Fallen leaves 00',
    category: 'collection',
    price: '$179 - $799',
    images: [
      '/images/IMG-20250213-WA0011-q1.jpg',
      '/images/IMG-20250213-WA0017-q2.jpg',
      '/images/IMG-20250213-WA0007-q3.jpg',
      '/images/IMG-20250213-WA0015-q4.jpg',
      '/images/IMG-20250213-WA0013-q5.jpg'
    ],
    description: 'Contemporary plant-leaves,lighting featuring cosmic designs and celestial aesthetics for modern spaces.',
    longDescription: 'Fallen leaves 00 represents the original concept in the fallen leaves series, featuring the pure essence of plant leaves in their natural state. This collection captures the intricate vein patterns, organic shapes, and natural beauty of leaves, creating lighting that brings the serenity of nature indoors.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'prism-series',
    name: 'Family tree',
    category: 'piece',
    price: '$250 - $350',
    images: [
      '/images/IMG-20250501-WA0021-p1.jpg',
      '/images/IMG-20250501-WA0020-p2.jpg',
      '/images/IMG-20250501-WA0018-p3.jpg',
      '/images/IMG-20250501-WA0015-p4.jpg',
      '/images/IMG-20250501-WA0009-p5.jpg'
    ],
    description: 'A stand lamp with three branches each one faces its own directions, featuring light refraction and spectrum effects for abstracts and dynamic illumination.',
    longDescription: 'The Family tree piece is a unique standing lamp that symbolizes the interconnectedness of family relationships. With three branches extending in different directions, each representing different family members or generations, this piece creates a beautiful metaphor for how families grow and spread while remaining connected at their roots. The multi-directional lighting creates dynamic illumination patterns throughout the room.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter for calabashes/ 100\"-200cm stand heights)",
      "Materials: gourd(calabash)/metal stand",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'orbit-collection',
    name: 'The young roar',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250516-WA0016-o1.jpg',
      '/images/IMG-20250516-WA0012-o2.jpg',
      '/images/IMG-20250516-WA0004-o3.jpg',
      '/images/IMG-20250516-WA0002-o4.jpg',
      '/images/IMG-20250516-WA0006-o5.jpg'
    ],
    description: 'Lion inspired design with two sides a young lion roaring and a very chilled dad each side showing a unique and dynamic patterns.',
    longDescription: 'The young roar piece captures the duality of lion behavior, showcasing both the fierce energy of a young lion announcing its presence to the world and the calm confidence of a mature male lion at rest. This dual-sided design tells the story of growth, maturity, and the different aspects of strength found in the king of beasts.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'nova-line',
    name: 'Butterfly effects',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250527-WA0035-n1.jpg',
      '/images/IMG-20250527-WA0033-n2.jpg',
      '/images/IMG-20250527-WA0039-n3.jpg',
      '/images/IMG-20250527-WA0037-n4.jpg',
      '/images/IMG-20250527-WA0036-n5.jpg'
    ],
    description: 'Explosive butterfly design with crystal spackle, featuring burst patterns and radial designs for dramatic illumination effects.',
    longDescription: 'Butterfly effects explores the concept that small changes can have large consequences, represented through an explosive butterfly design enhanced with crystal spackle. The piece features burst patterns that radiate from the central butterfly motif, creating dramatic illumination effects that symbolize the far-reaching impact of transformation and change.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "pink/red/green crystal beads",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'meridian-series',
    name: 'The wild sere',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250606-WA0007-m1.jpg',
      '/images/IMG-20250606-WA0011-m2.jpg',
      '/images/IMG-20250606-WA0021-m3.jpg',
      '/images/IMG-20250606-WA0013-m4.jpg',
      '/images/IMG-20250606-WA0001-m5.jpg'
    ],
    description: 'The wild inspired lamp, featuring linear and directional designs for precise illumination control.',
    longDescription: 'The wild sere piece captures the essence of the African wilderness in its most raw and untamed form. The design features linear and directional elements that represent the paths and territories of wild animals, creating precise illumination control that mimics the way light filters through the African bush.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'lumina-collection',
    name: 'The humming',
    category: 'collection',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250616-WA0007-l1.jpg',
      '/images/IMG-20250616-WA0001-l2.jpg',
      '/images/IMG-20250616-WA0003-l4.jpg',
      '/images/IMG-20250616-WA0009-l4.jpg',
      '/images/IMG-20250616-WA0005-l5.jpg'
    ],
    description: 'Elegant design showing hummingbird with different artisanal style clean illumination and minimalist design principles.',
    longDescription: 'The humming piece celebrates the delicate beauty and incredible energy of the hummingbird through elegant artisanal design. This piece showcases different artistic interpretations of these remarkable birds, emphasizing their grace, speed, and the joy they bring to any garden. The clean illumination and minimalist design principles create a serene and uplifting atmosphere.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'heritage-k-series',
    name: 'African Rhinoceros',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20231002_141245_IMG_0901-k1.jpg',
      '/images/20231002_141245_IMG_0901-k2.jpg',
      '/images/20231002_141245_IMG_0901-k3.jpg',
      '/images/20231002_141052_IMG_0893-k4.jpg',
      '/images/20231002_140955_IMG_0889-k5.jpg'
    ],
    description: 'African rhino on three different carving style with traditional craftsmanship meets contemporary design in this heritage featuring intricate patterns and timeless elegance.',
    longDescription: 'The African Rhinoceros piece showcases the mighty rhino through three distinct carving styles, each highlighting different aspects of this powerful creature. Traditional craftsmanship techniques are combined with contemporary design sensibilities to create a heritage piece that tells the story of one of Africa\'s most iconic animals through intricate patterns and timeless elegance.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'artisan-j-series',
    name: 'Cool King',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20231004_155909_IMG_0908-j1.jpg',
      '/images/20231004_160327_IMG_0926-j2.jpg',
      '/images/20231004_160327_IMG_0926-j3.jpg',
      '/images/20231004_160327_IMG_0926-j4.jpg',
      '/images/20231004_160327_IMG_0926-j5.jpg'
    ],
    description: 'A king of the jungle in three different styles, masterfully crafted lighting pieces showcasing exceptional artisanal techniques and sophisticated design elements.',
    longDescription: 'The Cool King piece celebrates the majesty of the lion through three different artistic interpretations. Each style captures a unique aspect of the king of the jungle, from fierce authority to regal composure. This masterfully crafted lighting piece showcases exceptional artisanal techniques and sophisticated design elements that honor the lion\'s legendary status.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'illumina-i-series',
    name: 'Chilly Cheetah',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20231011_145655_IMG_0938-i1.jpg',
      '/images/20231011_145655_IMG_0938-i2.jpg',
      '/images/20231011_145605_IMG_0937-i3.jpg',
      '/images/20231011_145655_IMG_0938-i4.jpg',
      '/images/20231011_150015_IMG_0953-i5.jpg'
    ],
    description: 'Exploration of artistry in three different sides. Innovative lighting solutions combining modern aesthetics with functional brilliance for contemporary living spaces.',
    longDescription: 'The Chilly Cheetah piece explores the grace and speed of the world\'s fastest land animal through three different artistic perspectives. Each side reveals a unique aspect of the cheetah\'s character, from its relaxed demeanor to its explosive energy. This innovative lighting solution combines modern aesthetics with functional brilliance, perfect for contemporary living spaces.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'terra-t-series',
    name: 'Bibi Baobab',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20231014_142008_IMG_0984-t1.jpg',
      '/images/20231014_141946_IMG_0982-t2.jpg',
      '/images/20231014_142225_IMG_0989-t3.jpg',
      '/images/20231014_142151_IMG_0987-t4.jpg',
      '/images/20231014_142516_IMG_0997-t5.jpg'
    ],
    description: 'Three different aspects of a baobab tree. Earth-inspired designs featuring natural textures and organic forms that bring warmth and character to any environment.',
    longDescription: 'The Bibi Baobab piece celebrates the iconic African baobab tree through three different artistic interpretations. Known as the \"Tree of Life,\" the baobab is showcased in various stages and perspectives, from its massive trunk to its distinctive silhouette. These earth-inspired designs feature natural textures and organic forms that bring the warmth and ancient wisdom of the baobab to any environment.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'urban-u-series',
    name: 'Brother Buffalo',
    category: 'piece',
    price: '$120 - $150',
    images: [
      '/images/20231019_144959_IMG_1031-u1.jpg',
      '/images/20231019_145104_IMG_1035-u2.jpg',
      '/images/20231019_145026_IMG_1032-u3.jpg',
      '/images/20231019_145051_IMG_1034-u4.jpg',
      '/images/20231019_145204_IMG_1038-u5.jpg'
    ],
    description: 'Three sided buffalo with metropolitan-inspired lighting featuring sleek patterns and contemporary finishes perfect for modern urban spaces.',
    longDescription: 'The Brother Buffalo piece honors the strength and resilience of the African buffalo through three distinct perspectives. Each side captures different aspects of this formidable creature, from its powerful stance to its protective nature. The metropolitan-inspired lighting features sleek patterns and contemporary finishes that make it perfect for modern urban spaces while maintaining connection to African wildlife.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'golden-g-series',
    name: 'Tied Wave',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20240105_163859_IMG_1386-g1.jpg',
      '/images/20240105_163859_IMG_1386-g2.jpg',
      '/images/20240105_163851_IMG_1385-g3.jpg',
      '/images/20240105_163847_IMG_1384-g4.jpg',
      '/images/20240105_163754_IMG_1380-g5.jpg'
    ],
    description: 'Luxurious abstract yet undefined shapes and elegant craftsmanship for sophisticated interiors.',
    longDescription: 'The Tied Wave piece explores the beauty of abstract forms through luxurious yet undefined shapes that invite personal interpretation. This elegant piece combines flowing, wave-like patterns with intricate binding details that create a sense of movement and fluidity. The sophisticated craftsmanship makes it perfect for contemporary interiors that appreciate artistic ambiguity and refined aesthetics.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'vintage-v-series',
    name: 'Posing Zebra',
    category: 'piece',
    price: '$100 - $160',
    images: [
      '/images/20240122_155926_IMG_1502-v1.jpg',
      '/images/20240122_160019_IMG_1505-v2.jpg',
      '/images/20240122_160128_IMG_1511-v3.jpg',
      '/images/20240122_160137_IMG_1512-v4.jpg',
      '/images/20240122_160320_IMG_1517-v5.jpg'
    ],
    description: 'The silly zebra trying to show that he got some moves. Creative craftsmanship combining different styles for the same results.',
    longDescription: 'The Posing Zebra piece captures the playful and spirited nature of zebras through whimsical artistic interpretation. This charming lamp showcases a zebra in various poses, each demonstrating the animal\'s personality and grace. The creative craftsmanship combines different artistic styles to achieve a cohesive yet dynamic result that brings joy and character to any space.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  },
  {
    id: 'harmony-h-series',
    name: 'Toto Tundu',
    category: 'piece',
    price: '$100 - $150',
    images: [
      '/images/20240326_142130_IMG_1803-h1.jpg',
      '/images/20240326_142155_IMG_1804-h2.jpg',
      '/images/20240326_142228_IMG_1805-h3.jpg',
      '/images/20240326_142228_IMG_1805-h4.jpg',
      '/images/20240326_142228_IMG_1805-h5.jpg'
    ],
    description: 'Harmoniously balanced designs featuring perfect proportions and refined aesthetics for creating peaceful ambiance.',
    longDescription: 'The Toto Tundu piece embodies harmoniously balanced designs featuring perfect proportions and refined aesthetics for creating peaceful ambiance. This carefully crafted lighting solution combines traditional artisanal techniques with contemporary design principles to deliver a serene and sophisticated lighting experience that enhances any living space.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: gourd(calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted artisanal construction",
      "Premium material selection",
      "Traditional craftsmanship techniques",
      "Contemporary design integration",
      "Multiple size options available",
      "Energy-efficient LED bulbs"
    ]
  }
];
  
export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const { addItem } = useEnquiry();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = products.find(p => p.id === productId);

  if (!product) {
    notFound();
  }

  const handleAddToEnquiry = () => {

    
    // Parse price string to number (remove $ and handle ranges)
    const priceString = product.price.replace('$', '');
    const priceNumber = parseFloat(priceString.split(' - ')[0]); // Take the first price if it's a range
    

    
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
    // Parse price string to number (remove $ and handle ranges)
    const priceString = product.price.replace('$', '');
    const priceNumber = parseFloat(priceString.split(' - ')[0]); // Take the first price if it's a range
    
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
                <h1 className="text-3xl font-bold text-gray-900 mb-4" style={{ marginLeft: '216px', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>{product.name}</h1>
                <PriceDisplay 
                  price={product.price} 
                  className="text-2xl font-semibold" 
                  style={{ color: '#786861', marginLeft: '216px' }}
                />
              </div>

              <div className="space-y-4" style={{ marginLeft: '216px' }}>
                <button 
                  onClick={handleAddToEnquiry}
                  className="text-white py-3 px-6 rounded-lg font-semibold transition-colors hover:opacity-90"
                  style={{ backgroundColor: '#1a1a1a', width: '360px' }}
                >
                  Add to Enquiry
                </button>
                <button 
                  onClick={handleWishlistToggle}
                  className="border-2 py-3 px-6 rounded-lg font-semibold transition-colors hover:text-white"
                  style={{ 
                    borderColor: '#1a1a1a', 
                    color: isInWishlist(product.id) ? 'white' : '#1a1a1a',
                    backgroundColor: isInWishlist(product.id) ? '#1a1a1a' : 'transparent',
                    width: '360px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.currentTarget.style.backgroundColor = '#1a1a1a';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#1a1a1a';
                    }
                  }}
                >
                  {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
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
        <div className="bg-white rounded-lg shadow-sm" style={{ width: 'calc(100% + 72px)' }}>
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
                <h3 className="text-xl font-semibold" style={{ color: '#91631D', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>Product Description</h3>
                <p className="text-gray-700 leading-relaxed text-base font-bold">
                  {product.longDescription}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold" style={{ color: '#91631D', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>Specifications</h3>
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
                <h3 className="text-xl font-semibold" style={{ color: '#91631D', fontFamily: 'Regen, Arial, Helvetica, sans-serif' }}>Key Features</h3>
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