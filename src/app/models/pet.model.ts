export interface Pet {
    id: number;
    name: string;
    breed: string;
    age: number;
    image: string;
    description: string;
    adopted: boolean;
    category: 'dog' | 'cat';  // ✅ Add category property
  }
  