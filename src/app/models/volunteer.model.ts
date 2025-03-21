export interface VolunteerApplication {
    id?: number; // Unique identifier (optional)
    name: string; // Full name of the applicant
    email: string; // Contact email
    phone: string; // Contact phone number
    availability: string; // Availability (e.g., "Weekends only", "Full-time")
    skills: string; // Relevant skills (e.g., "Animal Care", "Fundraising")
    reason: string; // Applicant's reason for volunteering
    status?: 'Pending' | 'Approved' | 'Rejected'; // Application status
    createdAt?: Date; // ✅ Timestamp when the application was submitted
    updatedAt?: Date; // ✅ Timestamp when the application was last modified
    notes?: string; // Optional notes for admin tracking
  }
  