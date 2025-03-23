import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if the user is authenticated
    if (this.auth.isAuthenticated()) {
      const role = this.auth.getUserRole();
      
      // Redirect to the appropriate dashboard based on user role
      if (role === 'admin') {
        this.router.navigate(['/admin']);  // Redirect to admin dashboard
      } else {
        this.router.navigate(['/admin-dashboard']);  // Redirect to user dashboard
      }
      
      return false;  // Prevent access to the login/registration pages
    }

    // Allow access to login or registration pages if the user is not authenticated
    return true;
  }
}
