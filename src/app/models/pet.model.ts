export interface Pet {
    _id?: string; // MongoDB ID
    id?: number;  // Optional number ID (if needed)
    name: string;
    breed: string;
    age: number;
    image: string;
    description: string;
    adopted: boolean;
    category: 'dog' | 'cat' | 'other';
  }
  