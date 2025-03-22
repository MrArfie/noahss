import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Import RouterModule for <router-outlet>
  template: `
    <div class="dashboard">
      <!-- Sidebar -->
      <aside [class.collapsed]="isSidebarCollapsed">
        <h2 *ngIf="!isSidebarCollapsed">Admin Panel</h2>
        <ul>
          <li><a routerLink="/admin/users" routerLinkActive="active">Manage Users</a></li>
          <li><a routerLink="/admin/pets" routerLinkActive="active">Manage Pets</a></li>
          <li><a routerLink="/admin/adoptions" routerLinkActive="active">Manage Adoptions</a></li>
          <li><a routerLink="/admin/volunteers" routerLinkActive="active">Manage Volunteers</a></li>
        </ul>
        <button class="logout" (click)="logout()">Logout</button>
      </aside>

      <!-- Main Content -->
      <main>
        <header>
          <button class="toggle-btn" (click)="toggleSidebar()">☰</button>
          <h1>Welcome, {{ adminName }}!</h1>
        </header>

        <!-- Router Outlet (For Admin Sub-pages) -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      height: 100vh;
    }

    /* Sidebar */
    aside {
      width: 250px;
      background: #2c3e50;
      color: white;
      padding: 20px;
      transition: width 0.3s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    aside.collapsed {
      width: 80px;
    }

    aside h2 {
      font-size: 18px;
      margin-bottom: 20px;
      transition: opacity 0.3s;
    }

    aside.collapsed h2 {
      opacity: 0;
      visibility: hidden;
    }

    aside ul {
      list-style: none;
      padding: 0;
    }

    aside ul li {
      margin: 15px 0;
    }

    aside ul li a {
      text-decoration: none;
      color: white;
      display: block;
      padding: 10px;
      border-radius: 4px;
      transition: background 0.3s;
    }

    aside ul li a:hover,
    aside ul li a.active {
      background: #34495e;
    }

    button.logout {
      width: 100%;
      padding: 10px;
      background: red;
      border: none;
      color: white;
      margin-top: auto;
      cursor: pointer;
      border-radius: 5px;
      transition: background 0.3s;
    }

    button.logout:hover {
      background: darkred;
    }

    /* Main Content */
    main {
      flex: 1;
      padding: 20px;
      background: #ecf0f1;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    button.toggle-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      aside {
        width: 80px;
      }

      aside h2 {
        display: none;
      }

      aside ul li a {
        text-align: center;
      }

      main {
        padding: 10px;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  isSidebarCollapsed = false;
  adminName = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user || user.role !== 'admin') {
      this.router.navigate(['/admin-login']); // ✅ Redirect unauthorized users
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
