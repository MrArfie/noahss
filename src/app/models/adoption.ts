export interface Adoption {
    _id: string;
    petName: string;
    userEmail: string;
    createdAt: Date;
    status: 'Pending' | 'Approved' | 'Rejected';
    notes?: string;
  }
  