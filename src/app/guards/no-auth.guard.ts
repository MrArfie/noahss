import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      const role = this.auth.getUserRole();
      // Redirect authenticated users to their respective dashboards
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/admin-dashboard']);
      }
      return false;  // Prevent accessing login/registration pages
    }
    return true;  // Allow unauthenticated users to access login/registration pages
  }
}
