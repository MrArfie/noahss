import { Routes } from '@angular/router';

// 🌐 Public Components
import { AdoptionComponent } from './components/adoption/adoption.component';
import { ContactComponent } from './components/contact/contact.component';
import { DonationFormComponent } from './components/donation-form/donation-form.component';
import { DonationComponent } from './components/donation/donation.component';
import { HomeComponent } from './components/home/home.component';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { VolunteerComponent } from './components/volunteer/volunteer.component';

// 🔐 Auth Components
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

// 👤 User Components
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

// 🛠️ Admin Components
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { ManageAdoptionsComponent } from './components/admin/manage-adoptions/manage-adoptions.component';
import { ManagePetsComponent } from './components/admin/manage-pets/manage-pets.component';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { ManageVolunteersComponent } from './components/admin/manage-volunteers/manage-volunteers.component';

// 🛡️ Guards
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  // ✅ Public Pages
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'adoption', component: AdoptionComponent },
  { path: 'pet/:id', component: PetDetailComponent }, // ✅ Detail route
  { path: 'volunteer', component: VolunteerComponent },
  { path: 'donation', component: DonationComponent },
  { path: 'donation-form', component: DonationFormComponent },

  // ✅ Auth Pages (NoAuthGuard for login and registration)
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: 'admin-login', component: AdminLoginComponent, canActivate: [NoAuthGuard] },

  // ✅ User Dashboard (Authenticated Users)
  { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard] },

  // ✅ Admin Dashboard (Authenticated Admins)
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: 'users', component: ManageUsersComponent },
      { path: 'pets', component: ManagePetsComponent },
      { path: 'adoptions', component: ManageAdoptionsComponent },
      { path: 'volunteers', component: ManageVolunteersComponent },
      { path: '', redirectTo: 'pets', pathMatch: 'full' }  // Default route within admin dashboard
    ]
  },

  // 🚨 Wildcard Route
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Redirect to home if route not found
];
