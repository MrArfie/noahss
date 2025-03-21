export interface AdoptionRequest {
    id?: number; // Optional ID for database reference
    name: string;
    email: string;
    phone: string;
    petId: number | null; // The ID of the pet being adopted
    reason: string;
    status?: 'Pending' | 'Approved' | 'Rejected'; // Optional status for backend processing
  }
  