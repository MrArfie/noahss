export interface Pet {
    id?: string; // Optional because it might not exist before creation (MongoDB _id)
    name: string;
    breed: string;
    age: number;
    image: string;
    description: string;
    adopted: boolean;
    category: 'dog' | 'cat' | 'other';
  }
  