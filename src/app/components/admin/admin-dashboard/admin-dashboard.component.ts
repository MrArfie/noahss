import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard">
      <!-- Sidebar -->
      <aside [class.collapsed]="isSidebarCollapsed">
        <div class="sidebar-top">
          <h2 *ngIf="!isSidebarCollapsed">🐾 Noah's Admin</h2>
          <ul>
            <li>
              <a routerLink="/admin/users" routerLinkActive="active" title="Users">
                <i class="fas fa-users"></i>
                <span *ngIf="!isSidebarCollapsed">Manage Users</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/pets" routerLinkActive="active" title="Pets">
                <i class="fas fa-dog"></i>
                <span *ngIf="!isSidebarCollapsed">Manage Pets</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/adoptions" routerLinkActive="active" title="Adoptions">
                <i class="fas fa-heart"></i>
                <span *ngIf="!isSidebarCollapsed">Manage Adoptions</span>
              </a>
            </li>
            <li>
              <a routerLink="/admin/volunteers" routerLinkActive="active" title="Volunteers">
                <i class="fas fa-hands-helping"></i>
                <span *ngIf="!isSidebarCollapsed">Manage Volunteers</span>
              </a>
            </li>
          </ul>
        </div>
        <button class="logout" (click)="logout()" title="Logout">
          <i class="fas fa-sign-out-alt"></i>
          <span *ngIf="!isSidebarCollapsed">Logout</span>
        </button>
      </aside>

      <!-- Main Content -->
      <main>
        <header>
          <div class="left">
            <button class="toggle-btn" (click)="toggleSidebar()">
              <i class="fas fa-bars"></i>
            </button>
            <h1>Welcome, {{ adminName }}!</h1>
          </div>
          <div class="right">
            <i class="fas fa-user-circle profile-icon"></i>
          </div>
        </header>

        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [/* KEEP YOUR STYLES EXACTLY AS THEY ARE */]
})
export class AdminDashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  adminName = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();

    // Debugging output
    console.log('[AdminDashboard] Loaded user:', user);

    if (!user || user.role !== 'admin') {
      this.router.navigate(['/admin-login']);
    } else {
      this.adminName = user.name;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/admin-login']);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
