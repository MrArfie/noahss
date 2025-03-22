// src/app/models/adoption.model.ts

export interface AdoptionRequest {
    id?: string | number;
  
    // Required fields for submission
    name: string;
    email: string;
    phone: string;
    reason: string;
    petId: string | number | null; // ✅ Allow null if form might pass it
  
    // Optional fields for backend processing
    status?: 'Pending' | 'Approved' | 'Rejected';
    createdAt?: Date;
    updatedAt?: Date;
  
    // Optional fields used when rendering in the admin panel
    applicant?: {
      name: string;
      email?: string;
    };
  
    pet?: {
      name: string;
      species?: string;
    };
  }
  