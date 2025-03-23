export interface Pet {
    _id?: string; // From MongoDB
    id?: string;  // Optional if backend transforms _id to id
    name: string;
    breed: string;
    age: number;
    image: string;
    description: string;
    adopted: boolean;
    category: 'dog' | 'cat' | 'other';
  }
  