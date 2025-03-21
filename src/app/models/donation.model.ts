export interface Donation {
    id?: number; // Unique identifier (optional)
    donorName: string; // Full name of the donor
    email: string; // Donor's email for receipts
    amount: number; // Donation amount
    paymentMethod: 'Bank Transfer' | 'PayPal' | 'Credit/Debit Card' | 'Cash'; // Payment method
    transactionId?: string; // Transaction ID (if applicable)
    createdAt?: Date; // Timestamp of when the donation was made
    notes?: string; // Optional admin notes
  }
  