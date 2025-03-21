import { Routes } from '@angular/router';

// Import Components
import { AdoptionFormComponent } from './components/adoption-form/adoption-form.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { DonationComponent } from './components/donation/donation.component';
import { HomeComponent } from './components/home/home.component';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';

export const routes: Routes = [
  // 🌍 General Pages
  { path: '', component: HomeComponent }, // 🏠 Home Page
  { path: 'contact', component: ContactComponent }, // 📞 Contact Page
  
  // 🐾 Adoption Routes
  { path: 'adoption', component: AdoptionComponent }, // 🐶 Adoption Listings
  { path: 'pet/:id', component: PetDetailComponent }, // 🐾 Individual Pet Detail Page
  { path: 'adoption-form', component: AdoptionFormComponent }, // 📝 Adoption Form Page
  
  // 💖 Donation Routes
  { path: 'donation', component: DonationComponent }, // 💰 Donation Page
  { path: 'donation-form', component: DonationFormComponent }, // 📝 Donation Form Page
  
  // 🤝 Volunteer Routes
  { path: 'volunteer', component: VolunteerComponent }, // 🙌 Volunteer Information
  
  // 🚨 Redirect unknown URLs to Home Page
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
