export interface VolunteerForm {
  name: string;
  email: string;
  phone: string;
  reason: string;
  availability: string; // ✅ Added missing property
  skills: string; // ✅ Added missing property
}
