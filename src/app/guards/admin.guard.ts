import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('auth-token'); // ✅ correct key
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : null;
    const role = user?.role;

    // ✅ Check for token AND admin role
    if (!token || role !== 'admin') {
      return this.router.parseUrl('/admin-login'); // ✅ redirect to admin login
    }

    return true;
  }
}
