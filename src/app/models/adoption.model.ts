export interface AdoptionRequest {
  _id?: string;  // ✅ for MongoDB
  id?: number;                            // Optional unique identifier
  name: string;                           // Applicant's full name
  email: string;                          // Applicant's email address
  phone: string;                          // Contact number
  petId: number | null;                   // ID of the pet being adopted
  reason: string;                         // Why the user wants to adopt
  status?: 'Pending' | 'Approved' | 'Rejected'; // Admin status
  createdAt?: Date;                       // Timestamp for submission (optional)
  updatedAt?: Date;                       // Timestamp for status update (optional)
  notes?: string;                         // Optional admin notes
}
