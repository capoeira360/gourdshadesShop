export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  price: string;
  images: string[];
  description: string;
  longDescription: string;
  specifications: string[];
  features: string[];
}

export const products: Product[] = [
  {
    id: 'african-wild-life-lamps',
    name: 'Tembo/Twiga savana',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/20240405_131741-a1.jpg',
      '/images/20240405_131752-a2.jpg',
      '/images/20240405_132015-a3.jpg',
      '/images/20240405_132238-a4.jpg',
      '/images/20240408_112214-a5.jpg'
    ],
    description: 'We hand-carved peaceful elephants and giraffes grazing under an acacia sky. At dusk, the warm bulb casts soft savanna twilight shadows right across your room.',
    longDescription: 'We hand-carved peaceful elephants and giraffes grazing under an acacia sky. At dusk, the warm bulb casts soft savanna twilight shadows right across your room.',
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
    id: 'sophisticated-abstract-crystal-lighting',
    name: 'Spackle blue/red',
    category: 'piece',
    subCategory: 'Abstract & Contemporary',
    price: '$120 - $150',
    images: [
      '/images/20240508_141055-b1.jpg',
      '/images/20240508_141122-b2.jpg',
      '/images/20240508_141338-b3.jpg',
      '/images/20240508_141359-b4.jpg',
      '/images/20240508_141454-b5.jpg'
    ],
    description: 'Tiny perforated constellations paired with hand-threaded blue and red glass beads that catch the light. When lit, it throws dancing specks of jewel color onto your walls.',
    longDescription: 'Tiny perforated constellations paired with hand-threaded blue and red glass beads that catch the light. When lit, it throws dancing specks of jewel color onto your walls.',
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
    id: 'african-woman-crystal-prismatic-lamp',
    name: 'Natural African woman',
    category: 'piece',
    subCategory: 'Cultural & Prismatic',
    price: '$150 - $180',
    images: [
      '/images/20240520_160914-c1.jpg',
      '/images/20240520_161245-c2.jpg',
      '/images/20240520_161300-c3.jpg',
      '/images/20240520_161309-c4.jpg',
      '/images/20240520_161319-c5.jpg'
    ],
    description: 'Each side celebrates the quiet grace and poise of an African woman. Warm beads and delicate carved contours fill the space with a calm, deeply comforting glow.',
    longDescription: 'Each side celebrates the quiet grace and poise of an African woman. Warm beads and delicate carved contours fill the space with a calm, deeply comforting glow.',
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
    id: 'trees-for-life-lamp',
    name: 'Trees for life',
    category: 'piece',
    subCategory: 'Botanical & Trees',
    price: '$100 - $150',
    images: [
      '/images/20240607_162317-d1.jpg',
      '/images/20240607_162627-d2.jpg',
      '/images/20240607_162641-d3.jpg',
      '/images/20240607_162656-d4.jpg',
      '/images/20240607_162743-d5.jpg'
    ],
    description: 'Three interlocking tree silhouettes wrap around the gourd with deep purple crystal accents. It feels like bringing a quiet, moonlit forest corner into your living room.',
    longDescription: 'Three interlocking tree silhouettes wrap around the gourd with deep purple crystal accents. It feels like bringing a quiet, moonlit forest corner into your living room.',
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
    id: 'twiga-mugshot-giraffe-lamp',
    name: 'Twiga mugshot',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/20240612_135043-e1.jpg',
      '/images/20240612_135118-e2.jpg',
      '/images/20240612_135256-e3.jpg',
      '/images/20240612_135313-e4-.jpg',
      '/images/20240612_140355-e5.jpg'
    ],
    description: 'A close-up portrait of the savanna\'s tallest wanderer, captured from three viewpoints. The clean light paths project tall, elegant arcs that add warmth to any quiet corner.',
    longDescription: 'A close-up portrait of the savanna\'s tallest wanderer, captured from three viewpoints. The clean light paths project tall, elegant arcs that add warmth to any quiet corner.',
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
    id: 'savanna-sunset-ecosystem-lamp',
    name: 'The wild sunset',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/20240614_140132-f2.jpg',
      '/images/20240614_140159-f3.jpg',
      '/images/20240614_140218-f4.jpg',
      '/images/20240614_135944-f5.jpg',
      '/images/20240614_140121-f5-.jpg'
    ],
    description: 'Carved with the whole savanna gathered together as dusk falls. Once turned on, predators and gentle herbivores come alive in a peaceful, golden silhouette against your wall.',
    longDescription: 'Carved with the whole savanna gathered together as dusk falls. Once turned on, predators and gentle herbivores come alive in a peaceful, golden silhouette against your wall.',
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
    id: 'fallen-leaves-2-0-lamp',
    name: 'Fallen leaves 2.0',
    category: 'piece',
    subCategory: 'Botanical & Trees',
    price: '$100 - $150',
    images: [
      '/images/IMG-20241116-WA0036-s1.jpg',
      '/images/IMG-20241116-WA0032-s2.jpg',
      '/images/IMG-20241116-WA0024-s3.jpg',
      '/images/IMG-20241116-WA0016-s4.jpg',
      '/images/IMG-20241116-WA0014-s5.jpg'
    ],
    description: 'Sweeping leaf trails cut into cured botanical shell, mimicking sunlight through a lush garden canopy. It creates an organic, meditative ambiance perfect for unwinding after a long day.',
    longDescription: 'Sweeping leaf trails cut into cured botanical shell, mimicking sunlight through a lush garden canopy. It creates an organic, meditative ambiance perfect for unwinding after a long day.',
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
    id: 'big-five-animal-faces-lamp',
    name: 'The five mugshots',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$200 - $250',
    images: [
      '/images/IMG-20250123-WA0028-r1.jpg',
      '/images/IMG-20250123-WA0026-r2.jpg',
      '/images/IMG-20250123-WA0022-r3.jpg',
      '/images/IMG-20250123-WA0020-r4.jpg',
      '/images/IMG-20250123-WA0016-r5.jpg'
    ],
    description: 'A bold statement piece featuring the faces of the lion, leopard, rhino, elephant, and buffalo. It casts powerful, commanding shadows that celebrate East Africa\'s wild heritage.',
    longDescription: 'A bold statement piece featuring the faces of the lion, leopard, rhino, elephant, and buffalo. It casts powerful, commanding shadows that celebrate East Africa\'s wild heritage.',
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
    id: 'fallen-leaves-00-lamp',
    name: 'Fallen leaves 00',
    category: 'collection',
    subCategory: 'Botanical & Trees',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250213-WA0011-q1.jpg',
      '/images/IMG-20250213-WA0017-q2.jpg',
      '/images/IMG-20250213-WA0007-q3.jpg',
      '/images/IMG-20250213-WA0015-q4.jpg',
      '/images/IMG-20250213-WA0013-q5.jpg'
    ],
    description: 'Simple, sweeping botanical curves carved into the natural gourd skin. We kept the lines clean so the warm, unfiltered ambient glow takes center stage in your sanctuary.',
    longDescription: 'Simple, sweeping botanical curves carved into the natural gourd skin. We kept the lines clean so the warm, unfiltered ambient glow takes center stage in your sanctuary.',
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
    id: 'family-tree-stand-lamp',
    name: 'Family tree',
    category: 'piece',
    subCategory: 'Floor Lamps',
    price: '$250 - $350',
    images: [
      '/images/family-tree-replace-1.jpg',
      '/images/family-tree-replace-2.jpg'
    ],
    description: 'A standing three-way luminaire built on natural wood branches. It spreads radiant light across three directions, symbolizing deep roots and growing generations together in the home.',
    longDescription: 'A standing three-way luminaire built on natural wood branches. It spreads radiant light across three directions, symbolizing deep roots and growing generations together in the home.',
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
    id: 'young-lion-roar-duality-lamp',
    name: 'The young roar',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250516-WA0016-o1.jpg',
      '/images/IMG-20250516-WA0012-o2.jpg',
      '/images/IMG-20250516-WA0004-o3.jpg',
      '/images/IMG-20250516-WA0002-o4.jpg',
      '/images/IMG-20250516-WA0006-o5.jpg'
    ],
    description: 'Captures the spirited energy of a young lion finding its voice. Bold open cuts throw warm amber patches across the room, full of warmth and youthful character.',
    longDescription: 'Captures the spirited energy of a young lion finding its voice. Bold open cuts throw warm amber patches across the room, full of warmth and youthful character.',
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
    id: 'butterfly-effects-crystal-lamp',
    name: 'Butterfly effects',
    category: 'piece',
    subCategory: 'Wildlife & Nature',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250527-WA0035-n1.jpg',
      '/images/IMG-20250527-WA0033-n2.jpg',
      '/images/IMG-20250527-WA0039-n3.jpg',
      '/images/IMG-20250527-WA0037-n4.jpg',
      '/images/IMG-20250527-WA0036-n5.jpg'
    ],
    description: 'Exploding butterfly wing patterns threaded with shimmering crystal spackle. Switch it on at night and your ceiling transforms into a soft, glowing halo of dancing light.',
    longDescription: 'Exploding butterfly wing patterns threaded with shimmering crystal spackle. Switch it on at night and your ceiling transforms into a soft, glowing halo of dancing light.',
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
    id: 'wild-linear-directional-lighting',
    name: 'The wild sere',
    category: 'piece',
    subCategory: 'Abstract & Contemporary',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250606-WA0007-m1.jpg',
      '/images/IMG-20250606-WA0011-m2.jpg',
      '/images/IMG-20250606-WA0021-m3.jpg',
      '/images/IMG-20250606-WA0013-m4.jpg',
      '/images/IMG-20250606-WA0001-m5.jpg'
    ],
    description: 'Clean directional stripes carved along the natural curve of the calabash. It throws sharp, modern geometric shadows that feel both ancient and strikingly contemporary.',
    longDescription: 'Clean directional stripes carved along the natural curve of the calabash. It throws sharp, modern geometric shadows that feel both ancient and strikingly contemporary.',
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
    id: 'hummingbird-elegant-artisanal-lighting',
    name: 'The humming',
    category: 'collection',
    subCategory: 'Botanical & Trees',
    price: '$100 - $150',
    images: [
      '/images/IMG-20250616-WA0007-l1.jpg',
      '/images/IMG-20250616-WA0001-l2.jpg',
      '/images/IMG-20250616-WA0003-l4.jpg',
      '/images/IMG-20250616-WA0009-l4.jpg',
      '/images/IMG-20250616-WA0005-l5.jpg'
    ],
    description: 'Delicate blossoms and hovering wings carved with fine micro-tools. It projects a light, airy ambiance that brings a sense of fresh botanical life to bedside tables.',
    longDescription: 'Delicate blossoms and hovering wings carved with fine micro-tools. It projects a light, airy ambiance that brings a sense of fresh botanical life to bedside tables.',
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
    id: 'african-rhino-heritage-carving-lamp',
    name: 'African Rhinoceros',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/20231002_141245_IMG_0901-k1.jpg',
      '/images/20231002_141245_IMG_0901-k2.jpg',
      '/images/20231002_141245_IMG_0901-k3.jpg',
      '/images/20231002_141052_IMG_0893-k4.jpg',
      '/images/20231002_140955_IMG_0889-k5.jpg'
    ],
    description: 'A grounding sculpture honoring the quiet power of the black rhino. Strong silhouette perforations cast rugged, textured shadows that ground any living space.',
    longDescription: 'A grounding sculpture honoring the quiet power of the black rhino. Strong silhouette perforations cast rugged, textured shadows that ground any living space.',
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
    id: 'lion-king-majestic-artisanal-lamp',
    name: 'Cool King',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/20231004_155909_IMG_0908-j1.jpg',
      '/images/20231004_160327_IMG_0926-j2.jpg',
      '/images/20231004_160327_IMG_0926-j3.jpg',
      '/images/20231004_160327_IMG_0926-j4.jpg',
      '/images/20231004_160327_IMG_0926-j5.jpg'
    ],
    description: 'Three interpretations of the king\'s regal mane carved into rich cured shell. It casts a proud, golden aura that brings warmth and quiet confidence to a home library or study.',
    longDescription: 'Three interpretations of the king\'s regal mane carved into rich cured shell. It casts a proud, golden aura that brings warmth and quiet confidence to a home library or study.',
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
    id: 'cheetah-speed-modern-artistry-lamp',
    name: 'Chilly Cheetah',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $150',
    images: [
      '/images/20231011_145655_IMG_0938-i1.jpg',
      '/images/20231011_145655_IMG_0938-i2.jpg',
      '/images/20231011_145605_IMG_0937-i3.jpg',
      '/images/20231011_145655_IMG_0938-i4.jpg',
      '/images/20231011_150015_IMG_0953-i5.jpg'
    ],
    description: 'Streamlined aerodynamic contours inspired by the speed and grace of the cheetah. At night, rhythmic light paths trace sleek motion across your floor and walls.',
    longDescription: 'Streamlined aerodynamic contours inspired by the speed and grace of the cheetah. At night, rhythmic light paths trace sleek motion across your floor and walls.',
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
    id: 'baobab-tree-of-life-earth-design',
    name: 'Bibi Baobab',
    category: 'piece',
    subCategory: 'Botanical & Trees',
    price: '$100 - $150',
    images: [
      '/images/20231014_142008_IMG_0984-t1.jpg',
      '/images/20231014_141946_IMG_0982-t2.jpg',
      '/images/20231014_142225_IMG_0989-t3.jpg',
      '/images/20231014_142151_IMG_0987-t4.jpg',
      '/images/20231014_142516_IMG_0997-t5.jpg'
    ],
    description: 'Honoring the ancient baobab tree, known across Africa as the tree of life. Its broad, deeply rooted silhouette wraps your space in a warm, timeless presence.',
    longDescription: 'Honoring the ancient baobab tree, known across Africa as the tree of life. Its broad, deeply rooted silhouette wraps your space in a warm, timeless presence.',
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
    id: 'buffalo-metropolitan-modern-lamp',
    name: 'Brother Buffalo',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$120 - $150',
    images: [
      '/images/20231019_144959_IMG_1031-u1.jpg',
      '/images/20231019_145104_IMG_1035-u2.jpg',
      '/images/20231019_145026_IMG_1032-u3.jpg',
      '/images/20231019_145051_IMG_1034-u4.jpg',
      '/images/20231019_145204_IMG_1038-u5.jpg'
    ],
    description: 'Strong, curved horn silhouettes carved into thick calabash husk. It gives off a steady, warm hearth glow that feels solid, protective, and deeply grounded.',
    longDescription: 'Strong, curved horn silhouettes carved into thick calabash husk. It gives off a steady, warm hearth glow that feels solid, protective, and deeply grounded.',
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
    id: 'tied-wave-abstract-lamp',
    name: 'Tied Wave',
    category: 'piece',
    subCategory: 'Abstract & Contemporary',
    price: '$100 - $150',
    images: [
      '/images/20240105_163859_IMG_1386-g1.jpg',
      '/images/20240105_163859_IMG_1386-g2.jpg',
      '/images/20240105_163851_IMG_1385-g3.jpg',
      '/images/20240105_163847_IMG_1384-g4.jpg',
      '/images/20240105_163754_IMG_1380-g5.jpg'
    ],
    description: 'Flowing organic waves that look like wind rippling through water. When evening sets in, the curved cuts cast hypnotic, rolling shadows that melt away evening stress.',
    longDescription: 'Flowing organic waves that look like wind rippling through water. When evening sets in, the curved cuts cast hypnotic, rolling shadows that melt away evening stress.',
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
    id: 'posing-zebra-gourd-lamp',
    name: 'Posing Zebra',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$100 - $160',
    images: [
      '/images/posing-zebra-replace-1.jpg',
      '/images/posing-zebra-replace-2.jpg',
      '/images/20240122_160128_IMG_1511-v3.jpg',
      '/images/20240122_160137_IMG_1512-v4.jpg',
      '/images/20240122_160320_IMG_1517-v5.jpg'
    ],
    description: 'Bold zebra stripes carved with contrasting rhythmic spacing. Switch it on and striking monochrome patterns ripple across your room like shadows in the Serengeti breeze.',
    longDescription: 'Bold zebra stripes carved with contrasting rhythmic spacing. Switch it on and striking monochrome patterns ripple across your room like shadows in the Serengeti breeze.',
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
    id: 'harmonious-balanced-serene-lighting',
    name: 'Toto Tundu',
    category: 'piece',
    subCategory: 'Bedside & Table Lamps',
    price: '$100 - $150',
    images: [
      '/images/20240326_142130_IMG_1803-h1.jpg',
      '/images/20240326_142155_IMG_1804-h2.jpg',
      '/images/20240326_142228_IMG_1805-h3.jpg',
      '/images/20240326_142228_IMG_1805-h4.jpg',
      '/images/20240326_142228_IMG_1805-h5.jpg'
    ],
    description: 'A playful, rounded bedside lamp dotted with cheerful starburst pinholes. It casts a gentle, cozy glow that makes bedrooms feel instantly relaxed and welcoming.',
    longDescription: 'A playful, rounded bedside lamp dotted with cheerful starburst pinholes. It casts a gentle, cozy glow that makes bedrooms feel instantly relaxed and welcoming.',
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
    id: 'aura-new-design-lamp',
    name: 'Aura',
    category: 'new design',
    subCategory: 'New Designs',
    price: '$100 - $150',
    images: [
      '/new-designs/aura-1.jpg',
      '/new-designs/aura-2.jpg',
      '/new-designs/aura-3.jpg',
      '/new-designs/aura-4.jpg',
      '/new-designs/aura-5.jpg'
    ],
    description: 'Our new minimalist exploration pairing clean concentric rings with warm gourd tones. It bathes tabletops in an even, tranquil halo that feels effortless and modern.',
    longDescription: 'Our new minimalist exploration pairing clean concentric rings with warm gourd tones. It bathes tabletops in an even, tranquil halo that feels effortless and modern.',
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
    id: 'comfort-new-design-lamp',
    name: 'Comfort',
    category: 'new design',
    subCategory: 'New Designs',
    price: '$100 - $150',
    images: [
      '/new-designs/comfort-1.jpg',
      '/new-designs/comfort-2.jpg',
      '/new-designs/comfort-3.jpg',
      '/new-designs/comfort-4.jpg',
      '/new-designs/comfort-5.jpg'
    ],
    description: 'Designed specifically to create a restful evening corner with soft, low-glare light vents. Perfect beside a reading armchair or bedside for unwinding with a favorite book.',
    longDescription: 'Designed specifically to create a restful evening corner with soft, low-glare light vents. Perfect beside a reading armchair or bedside for unwinding with a favorite book.',
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
    id: 'luster-new-design-lamp',
    name: 'Luster',
    category: 'new design',
    subCategory: 'New Designs',
    price: '$100 - $150',
    images: [
      '/new-designs/luster-1.jpg',
      '/new-designs/luster-2.jpg',
      '/new-designs/luster-3.jpg',
      '/new-designs/luster-4.jpg',
      '/new-designs/luster-5.jpg'
    ],
    description: 'Dense clusters of micro-drilled light points that shimmer like polished beads. It turns nighttime illumination into a rich, luminous texture across plain walls.',
    longDescription: 'Dense clusters of micro-drilled light points that shimmer like polished beads. It turns nighttime illumination into a rich, luminous texture across plain walls.',
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
    id: 'pembe-tatu-new-design-lamp',
    name: 'Pembe Tatu',
    category: 'new design',
    subCategory: 'New Designs',
    price: '$100 - $150',
    images: [
      '/new-designs/pembe-tatu-1.jpg',
      '/new-designs/pembe-tatu-2.jpg',
      '/new-designs/pembe-tatu-3.jpg',
      '/new-designs/pembe-tatu-4.jpg',
      '/new-designs/pembe-tatu-5.jpg'
    ],
    description: 'A three-sided architectural geometry carved into a tall botanical sphere. Each turn presents a fresh geometric perspective, casting structured light shapes in all directions.',
    longDescription: 'A three-sided architectural geometry carved into a tall botanical sphere. Each turn presents a fresh geometric perspective, casting structured light shapes in all directions.',
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
    id: 'floor-flexible-threeways-lamp',
    name: 'Floor-Flexible Threeways',
    category: 'piece',
    subCategory: 'Floor Lamps',
    price: '$280 - $380',
    images: [
      '/images/floor-flexible-threeways-1.jpg',
      '/images/floor-flexible-threeways-2.jpg',
      '/images/floor-flexible-threeways-3.jpg',
      '/images/floor-flexible-threeways-4.jpg',
      '/images/floor-flexible-threeways-5.jpg'
    ],
    description: 'Three independent flexible necks let you direct handcrafted calabash shades where you need them most. Perfect for open living rooms that love dramatic accent lighting.',
    longDescription: 'Three independent flexible necks let you direct handcrafted calabash shades where you need them most. Perfect for open living rooms that love dramatic accent lighting.',
    specifications: [
      "Dimensions: 160cm-190cm height, 3 x 20-25cm calabash shades",
      "Materials: Natural calabash, handcrafted steel branch frame, brass fixtures",
      "Bulb Type: 3 x E27 Standard Base (LED recommended)",
      "Wattage: 3W-10W per bulb",
      "Voltage: 110V-240V AC international compatible",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Tri-directional flexible illumination",
      "Hand-carved organic perforation patterns",
      "Weighted artisanal base for sturdy floor placement",
      "Energy-efficient multi-bulb configuration"
    ]
  },
  {
    id: 'floor-sculptured-stand-lamp',
    name: 'Floor-Sculptured Stand',
    category: 'piece',
    subCategory: 'Floor Lamps',
    price: '$260 - $360',
    images: [
      '/images/floor-sculptured-stand-1.jpg',
      '/images/floor-sculptured-stand-2.jpg',
      '/images/floor-sculptured-stand-3.jpg',
      '/images/floor-sculptured-stand-4.jpg'
    ],
    description: 'An artistic floor sculpture mounted on hand-welded steel hairpin legs. It anchors the corner of your lounge with dramatic height and sweeping shadow projections.',
    longDescription: 'An artistic floor sculpture mounted on hand-welded steel hairpin legs. It anchors the corner of your lounge with dramatic height and sweeping shadow projections.',
    specifications: [
      "Dimensions: 140cm-170cm height / 25-30cm shade diameter",
      "Materials: Dried gourd (calabash), hand-forged sculptural stand",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (LED recommended)",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Unique sculptural silhouette",
      "Precision drilled light projection vents",
      "Artisanal floor balance and weighted base"
    ]
  },
  {
    id: 'standing-bedside-lamp',
    name: 'Standing Bed Side',
    category: 'piece',
    subCategory: 'Bedside & Table Lamps',
    price: '$120 - $160',
    images: [
      '/images/standing-bedside-1.jpg',
      '/images/standing-bedside-2.jpeg',
      '/images/standing-bedside-3.jpg',
      '/images/standing-bedside-4.jpeg',
      '/images/standing-bedside-5.jpeg'
    ],
    description: 'A compact, rounded companion shaped naturally by sun and soil. It sits quietly on your nightstand, providing just enough soft glow for quiet evening conversations.',
    longDescription: 'A compact, rounded companion shaped naturally by sun and soil. It sits quietly on your nightstand, providing just enough soft glow for quiet evening conversations.',
    specifications: [
      "Dimensions: 35cm-45cm height / 18-22cm diameter",
      "Materials: Natural calabash, weighted desktop stand",
      "Bulb Type: E14 / E27 Base",
      "Wattage: 3W-7W warm LED",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Intimate bedside illumination",
      "Soft soothing light distribution",
      "Hand-carved organic texture"
    ]
  },
{
    id: 'hanging-single-pendant-lamp',
    name: 'Hanging Lamps',
    category: 'piece',
    subCategory: 'Hanging Lamps',
    price: '$140 - $190',
    images: [
      '/images/hanging-single-1.jpg',
      '/images/hanging-single-2.jpg',
      '/images/hanging-single-3.jpeg'
    ],
    description: 'Suspended gracefully from woven textile cord over a table or nook. It directs intimate downlight while casting gentle radial stars across your dining ceiling.',
    longDescription: 'Suspended gracefully from woven textile cord over a table or nook. It directs intimate downlight while casting gentle radial stars across your dining ceiling.',
    specifications: [
      "Dimensions: 25cm-35cm shade height / 1.5m adjustable braided cord",
      "Materials: Natural gourd, braided textile cable, brass ceiling canopy",
      "Bulb Type: E27 Standard Base",
      "Wattage: 4W-10W LED",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Ceiling pendant suspension",
      "Adjustable drop height",
      "Radial shadow projection"
    ]
  },
  {
    id: 'hanging-three-ways-cluster-lamp',
    name: 'Hanging Three Ways',
    category: 'piece',
    subCategory: 'Hanging Lamps',
    price: '$290 - $390',
    images: [
      '/images/hanging-threeways-1.jpg',
      '/images/hanging-threeways-2.jpg',
      '/images/hanging-threeways-3.jpeg'
    ],
    description: 'A trio of distinct calabash globes clustered at cascading heights from a single canopy. Creates an eye-catching, multi-layered ceiling feature over dining tables and foyers.',
    longDescription: 'A trio of distinct calabash globes clustered at cascading heights from a single canopy. Creates an eye-catching, multi-layered ceiling feature over dining tables and foyers.',
    specifications: [
      "Dimensions: 3 x 20-25cm calabash pendants, staggered heights up to 1.8m",
      "Materials: Natural calabash, braided cables, multi-port canopy",
      "Bulb Type: 3 x E27 Base",
      "Wattage: 3 x 4W-8W LED",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Three-point cascading pendant cluster",
      "Multi-tiered celestial light projection",
      "Statement lighting centerpiece"
    ]
  },
  {
    id: 'wall-mounted-sculptural-lamp',
    name: 'Wall Lamps',
    category: 'piece',
    subCategory: 'Wall Lamps',
    price: '$130 - $180',
    images: [
      '/images/wall-lamp-1.jpg',
      '/images/wall-lamp-2.jpg',
      '/images/wall-maunted-3.jpg'
    ],
    description: 'Mounted flush against the wall like living sculpture. Backlit halos bounce warm light into the room while detailed face carvings project expressive shadow art.',
    longDescription: 'Mounted flush against the wall like living sculpture. Backlit halos bounce warm light into the room while detailed face carvings project expressive shadow art.',
    specifications: [
      "Dimensions: 25cm-35cm height / 15-20cm wall projection",
      "Materials: Hand-carved calabash, steel wall mount bracket",
      "Bulb Type: E27 or E14 Base",
      "Wattage: 3W-6W warm LED",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Flush wall sconce mount",
      "Back-lit halo effect",
      "Architectural accent lighting"
    ]
  },
  {
    id: 'bespoke-custom-design-lamp',
    name: 'Custom Design',
    category: 'piece',
    subCategory: 'Custom Design',
    price: 'Custom Quote',
    images: [
      '/images/IMG-20250529-WA0007-nav-contacts.jpg',
      '/images/20240520_161231-featured-1.jpg',
      '/images/20241018_094717-reach-1-.jpg'
    ],
    description: 'Work directly with our studio to choose your raw gourd shape, dimension, and carving motifs. We craft a truly personal, one-of-a-kind luminaire made just for your space.',
    longDescription: 'Work directly with our studio to choose your raw gourd shape, dimension, and carving motifs. We craft a truly personal, one-of-a-kind luminaire made just for your space.',
    specifications: [
      "Dimensions: Tailored to your space (Table, Floor, Wall, or Suspended)",
      "Materials: Sustainably harvested Tanzanian calabash, bespoke metalwork / brass hardware",
      "Bulb Type: E27 / E14 (110V - 240V international compatible)",
      "Lead Time: 2-4 weeks handcrafted from raw botanical selection to completion",
      "Warranty: 3 months on all electrical fixtures"
    ],
    features: [
      "One-on-one design consultation with the master artisan",
      "Custom perforated patterns, symbols, or crystal bead configurations",
      "Personalized engraved brass plaque or signature detailing",
      "Worldwide insured express shipping"
    ]
  },
  {
    id: 'ndovu-calabash-lamp',
    name: 'Ndovu',
    category: 'piece',
    subCategory: 'Wildlife Sculptures',
    price: '$140 - $190',
    images: [
      '/images/ndovu-1.jpg',
      '/images/ndovu-2.jpg',
      '/images/ndovu-3.jpg'
    ],
    description: 'Carved with the proud silhouette of the African elephant walking through acacia brush. When lit, it casts grand savanna twilight shadows that fill your home with calm.',
    longDescription: 'Carved with the proud silhouette of the African elephant walking through acacia brush. When lit, it casts grand savanna twilight shadows that fill your home with calm.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: Natural gourd (calabash)",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (warm LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted Ndovu elephant silhouette carving",
      "Savanna twilight shadow projection",
      "Natural cured calabash body",
      "Warm ambient lighting aura",
      "Energy-efficient LED compatible"
    ]
  },
  {
    id: 'butterfly-dreams-lamp',
    name: 'Butterfly Dreams',
    category: 'piece',
    subCategory: 'Wildlife & Nature',
    price: '$130 - $170',
    images: [
      '/images/butterfly-dreams-1.jpg',
      '/images/butterfly-dreams-2.jpg',
      '/images/butterfly-dreams-3.jpg'
    ],
    description: 'Delicate butterfly wings hand-perforated with colorful crystal beads along their flight paths. It scatters a cheerful, rainbow-hued glow across bedroom or living room walls.',
    longDescription: 'Delicate butterfly wings hand-perforated with colorful crystal beads along their flight paths. It scatters a cheerful, rainbow-hued glow across bedroom or living room walls.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: Natural gourd (calabash), colorful crystal beads",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (warm LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Artisan butterfly wing perforation detailing",
      "Hand-threaded prismatic crystal beads",
      "Dual ambient light & shadow halo projection",
      "Sustainable natural calabash medium",
      "Energy-efficient LED illumination"
    ]
  },
  {
    id: 'sculptured-tri-lamp',
    name: 'Sculptured Tri',
    category: 'piece',
    subCategory: 'Floor Lamps',
    price: '$270 - $370',
    images: [
      '/images/sculpured-tri-1.jpg',
      '/images/sculpured-tri-2.jpg',
      '/images/sculpured-tri-3.jpg'
    ],
    description: 'A sculpted calabash globe cradled on a custom three-legged architectural stand. Its radial starburst carvings throw dramatic, room-filling shadow patterns across floors and walls.',
    longDescription: 'A sculpted calabash globe cradled on a custom three-legged architectural stand. Its radial starburst carvings throw dramatic, room-filling shadow patterns across floors and walls.',
    specifications: [
      "Dimensions: 140cm-170cm height / 25-30cm shade diameter",
      "Materials: Natural calabash, hand-forged sculptural tripod stand",
      "Bulb Type: E27 Standard Base",
      "Wattage: 4W-10W (LED recommended)",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Three-legged architectural sculptural stand",
      "Radiant geometric perforation map",
      "Elevated statement floor presence",
      "Handcrafted natural botanical shade",
      "Weighted base for steady balance"
    ]
  },
  {
    id: 'hanging-draw-lamp',
    name: 'Hanging Draw',
    category: 'piece',
    subCategory: 'Hanging Lamps',
    price: '$150 - $210',
    images: [
      '/images/hanging-draw-1.jpg',
      '/images/hanging-draw-2.jpg',
      '/images/hanging-draw-3.jpg',
      '/images/hanging-draw-4.jpg'
    ],
    description: 'Freehand linear sketches carved directly onto the botanical shell and hung as a pendant. It brings an intimate, hand-drawn warmth to kitchen islands and breakfast nooks.',
    longDescription: 'Freehand linear sketches carved directly onto the botanical shell and hung as a pendant. It brings an intimate, hand-drawn warmth to kitchen islands and breakfast nooks.',
    specifications: [
      "Dimensions: 25cm-35cm shade height / 1.5m adjustable braided textile cord",
      "Materials: Natural gourd, braided textile cable, brass ceiling canopy",
      "Bulb Type: E27 Standard Base",
      "Wattage: 4W-10W LED",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Hand-drawn geometric linear carving",
      "Ceiling pendant suspension with brass canopy",
      "Adjustable drop height for custom spaces",
      "Downlight illumination with radial wall shadows",
      "Artisanal one-of-a-kind finish"
    ]
  },
  {
    id: '3-way-hanging-family-lamp',
    name: '3-Way Hanging Familiy',
    category: 'piece',
    subCategory: 'Hanging Lamps',
    price: '$310 - $420',
    images: [
      '/images/3-way-hanging-familiy-1.jpg',
      '/images/3-way-hanging-familiy-2.jpg'
    ],
    description: 'Three complementary gourds cascading together like an artisan chandelier. Each shade has its own individual carving, blending together into a rich, cohesive canopy of light.',
    longDescription: 'Three complementary gourds cascading together like an artisan chandelier. Each shade has its own individual carving, blending together into a rich, cohesive canopy of light.',
    specifications: [
      "Dimensions: 3 x 20-25cm calabash pendants, staggered heights up to 1.8m",
      "Materials: Natural calabash, braided cables, multi-port ceiling canopy",
      "Bulb Type: 3 x E27 Base",
      "Wattage: 3 x 4W-8W LED",
      "Voltage: 110V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Triple pendant cascading family arrangement",
      "Tiered multi-dimensional shadow tapestry",
      "Unified single-canopy ceiling mount",
      "Organic botanical texture variations",
      "Statement centerpiece illumination"
    ]
  },
  {
    id: 'coral-calabash-lamp',
    name: 'Coral',
    category: 'piece',
    subCategory: 'Abstract & Contemporary',
    price: '$120 - $160',
    images: [
      '/images/coral-1.jpg',
      '/images/coral-2.jpg',
      '/images/coral-3.jpeg',
      '/images/coral-4.jpeg'
    ],
    description: 'Inspired by the organic textures and flowing porous structures of ocean reefs. Hundreds of micro-holes cast a shimmering, underwater-like glow that soothes the senses.',
    longDescription: 'Inspired by the organic textures and flowing porous structures of ocean reefs. Hundreds of micro-holes cast a shimmering, underwater-like glow that soothes the senses.',
    specifications: [
      "Dimensions: Various sizes available (20\"-30\" diameter/ 25\"-35cm heights)",
      "Materials: Natural gourd (calabash), warm brass accents",
      "Bulb Type: E27 Standard Base",
      "Wattage: 3W-10W (warm LED recommended)",
      "Voltage: 120V-240V AC",
      "Warranty: on electrical fixtures (3 months)"
    ],
    features: [
      "Handcrafted coral reef perforation pattern",
      "Fluid organic silhouette contours",
      "Immersive marine-like light projection",
      "Premium hand-selected natural calabash",
      "Energy-efficient LED illumination"
    ]
  }
];
