export interface VolunteerApplication {
    id?: number;
    name: string;
    email: string;
    phone: string;
    availability: string;
    skills: string;
    reason: string;
    status?: 'Pending' | 'Approved' | 'Rejected';
    createdAt?: Date;
    updatedAt?: Date;
    notes?: string;
  }
  