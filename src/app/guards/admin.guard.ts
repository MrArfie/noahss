import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // User must be logged in AND have 'admin' role
    if (!token || role !== 'admin') {
      return this.router.parseUrl('/login'); // Redirect to login for better UX
    }

    return true;
  }
}
