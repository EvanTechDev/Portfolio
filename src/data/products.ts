export interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  amazonLink?: string;
  sellingPrice: number;  // Actual selling price
  mrp?: number;          // Higher "fake" price
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Minecraft',
    description: 'Experience unforgettable adventures as you face mysterious foes, traverse exciting landscapes, and travel to perilous dimensions.',
    imageUrl: '/images/products/logitech.webp',
    sellingPrice: 20,
    category: 'Games',
    featured: true,
  },
  {
    id: '2',
    title: 'Forza Horizon 5',
    description: 'Your Ultimate Horizon Adventure awaits! Explore the vibrant and ever-evolving open world landscapes of Mexico with limitless, fun driving action in hundreds of the world’s greatest cars',
    imageUrl: 'https://store-images.s-microsoft.com/image/apps.47660.13718773309227929.a9ed3a56-4096-4b23-aca9-a9d49ff8b774.65ebc27e-ebbc-4f08-8def-1ee405857d48',
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
    imageUrl: 'https://store-images.s-microsoft.com/image/apps.42365.13877341660077011.7198ab78-e545-4cfe-8105-110d8c697dac.9e160a4b-4beb-4700-ab2a-0ff8c5ebf6bb',
    amazonLink: 'https://amzn.to/3F0ZMFW',
    sellingPrice: 40,
    mrp: 2499,
    category: 'Games',
    featured: true,
  },
  {
    id: '4',
    title: 'Train Sim World',
    description: 'The Rails are Yours in Train Sim World 5! Take on new challenges and new roles as you master the tracks and trains of iconic cities across 3 new routes. Immerse yourself in the ultimate rail hobby and embark on your next journey.
',
    imageUrl: 'https://store-images.s-microsoft.com/image/apps.62258.13533673129408975.95f4b180-e431-4714-922e-b555f8c6879d.8a14e824-59f7-4b59-9130-27f2541edf23',
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
    imageUrl: 'https://store-images.s-microsoft.com/image/apps.6102.14338464553682385.1a51ad2e-014e-44df-bbf5-a9a8e7392c91.466839f2-2264-40cf-8caf-2996bff87719',
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
    imageUrl: 'https://store-images.s-microsoft.com/image/apps.15939.14293123921570736.739af26b-0b56-4d3a-8d57-149d26c2cc05.bb4ae528-4489-49a9-bf1b-a03bcff6c0f1',
    amazonLink: 'https://amzn.to/4buFJMB',
    sellingPrice: 60,
    mrp: 1299,
    category: 'Games',
    featured: true,
  },
];
