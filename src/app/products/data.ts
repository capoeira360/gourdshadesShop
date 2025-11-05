export interface Product {
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

export const products: Product[] = [
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
    longDescription: 'The Bibi Baobab piece celebrates the iconic African baobab tree through three different artistic interpretations. Known as the "Tree of Life," the baobab is showcased in various stages and perspectives, from its massive trunk to its distinctive silhouette. These earth-inspired designs feature natural textures and organic forms that bring the warmth and ancient wisdom of the baobab to any environment.',
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