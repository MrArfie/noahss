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
      this.router.navigate([role === 'admin' ? '/admin' : '/admin-dashboard']);
      return false;
    }
    return true;
  }
}
