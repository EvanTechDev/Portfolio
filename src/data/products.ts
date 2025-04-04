export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  amazonLink: string;
  sellingPrice: number;  // Actual selling price
  mrp: number;          // Higher "fake" price
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Minecraft',
    description: 'Experience unforgettable adventures as you face mysterious foes, traverse exciting landscapes, and travel to perilous dimensions.',
    imageUrl: '/images/products/Minecraft.png',
    amazonLink: "amazon.com",
    sellingPrice: 20,
    mrp: 1,
    category: 'Games',
    featured: true,
  },
  {
    id: '2',
    title: 'Forza Horizon 5',
    description: 'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars',
    imageUrl: '/images/products/Forza.jpg',
    amazonLink: 'https://amzn.to/4iakEZP',
    sellingPrice: 60,
    mrp: 299,
    category: 'Games',
    featured: true,
  },
  {
    id: '3',
    title: 'Cities: Skylines',
    description: "Cities: Skylines  puts you in charge of a growing city, from the ground-breaking of its first streets to the ever-changing needs of thousands of citizens. Design, build, and manage the city of your dreams, from public services to civic policies, and challenge yourself to grow from a simple town to a bustling metropolitan hub.",
    imageUrl: '/images/products/Skyline.jpg',
    amazonLink: 'https://amzn.to/3F0ZMFW',
    sellingPrice: 40,
    mrp: 2499,
    category: 'Games',
    featured: true,
  },
  {
    id: '4',
    title: 'Train Sim World',
    description: 'The Rails are Yours in Train Sim World 5! Take on new challenges and new roles as you master the tracks and trains of iconic cities across 3 new routes. Immerse yourself in the ultimate rail hobby and embark on your next journey.',
    imageUrl: '/images/products/Train.jpg',
    amazonLink: 'https://amzn.to/3QsYt5n',
    sellingPrice: 50,
    mrp: 999,
    category: 'Games',
    featured: false,
  },
  {
    id: '5',
    title: 'SnowRunner',
    description: 'SnowRunner puts you in the driver’s seat of powerful vehicles as you conquer extreme open environments with the most advanced terrain simulation ever. Drive 40 vehicles from brands such as Ford, Chevrolet, and Freightliner as you leave your mark on an untamed open world.',
    imageUrl: '/images/products/Snow.jpg',
    amazonLink: 'https://amzn.to/4buFJMB',
    sellingPrice: 40,
    mrp: 1299,
    category: 'Games',
    featured: true,
  },
  {
    id: '6',
    title: 'Microsoft Flight Simulator',
    description: 'From light planes to wide body jets to gliders and helicopters, fly highly detailed and accurate aircraft in the Microsoft Flight Simulator 40th Anniversary Edition. The world is at your fingertips.',
    imageUrl: '/images/products/Flight.jpg',
    amazonLink: 'https://amzn.to/4buFJMB',
    sellingPrice: 60,
    mrp: 1299,
    category: 'Games',
    featured: true,
  },
];
