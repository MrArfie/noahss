import { Routes } from '@angular/router';

// Public Components
import { AdoptionFormComponent } from './components/adoption-form/adoption-form.component';
import { AdoptionComponent } from './components/adoption/adoption.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { DonationComponent } from './components/donation/donation.component';
import { HomeComponent } from './components/home/home.component';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';

// Auth Components
import { AdminLoginComponent } from './components/auth/admin-login/admin-login.component'; // ✅ NEW
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

// Admin Components
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ManageAdoptionsComponent } from './components/admin/manage-adoptions/manage-adoptions.component';
import { ManagePetsComponent } from './components/admin/manage-pets/manage-pets.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageVolunteersComponent } from './components/admin/manage-volunteers/manage-volunteers.component';

// User Dashboard
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

// Guards
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'adoption', component: AdoptionComponent },
  { path: 'pet/:id', component: PetDetailComponent },
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'donation-form', component: DonationFormComponent },

  // Auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-login', component: AdminLoginComponent }, // ✅ NEW ROUTE
  { path: 'adoption-form', component: AdoptionFormComponent, canActivate: [AuthGuard] },

  // User Dashboard
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },

  // Admin Dashboard
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'users', component: ManageUsersComponent },
      { path: 'pets', component: ManagePetsComponent },
      { path: 'adoptions', component: ManageAdoptionsComponent },
      { path: 'volunteers', component: ManageVolunteersComponent },
      { path: '', redirectTo: 'pets', pathMatch: 'full' }
    ]
  },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
