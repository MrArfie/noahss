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
  styles: [`
    /* Global styles for the admin dashboard */
    .dashboard {
      display: flex;
      height: 100vh;
      background-color: #f4f6f9;
    }

    /* Sidebar */
    aside {
      width: 250px;
      background-color: #333;
      color: #fff;
      display: flex;
      flex-direction: column;
      padding: 20px;
      transition: all 0.3s ease;
    }

    aside.collapsed {
      width: 60px;
    }

    .sidebar-top h2 {
      margin-bottom: 20px;
      font-size: 24px;
      text-align: center;
      display: block;
      color: #fff;
      font-weight: bold;
    }

    .sidebar-top ul {
      list-style: none;
      padding: 0;
    }

    .sidebar-top ul li {
      margin: 15px 0;
    }

    .sidebar-top ul li a {
      color: #fff;
      text-decoration: none;
      display: flex;
      align-items: center;
      padding: 10px;
      font-size: 16px;
      transition: background-color 0.3s;
    }

    .sidebar-top ul li a:hover {
      background-color: #7bbf1a;
    }

    .sidebar-top ul li a .fas {
      margin-right: 10px;
    }

    .logout {
      margin-top: auto;
      background: transparent;
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      padding: 15px;
      display: flex;
      align-items: center;
    }

    .logout:hover {
      background-color: #c0392b;
    }

    .logout .fas {
      margin-right: 10px;
    }

    /* Main content */
    main {
      flex-grow: 1;
      padding: 20px;
      background-color: #fff;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    header h1 {
      font-size: 24px;
      color: #333;
      font-weight: 600;
    }

    header .profile-icon {
      font-size: 32px;
      color: #333;
    }

    .toggle-btn {
      background: none;
      border: none;
      font-size: 24px;
      color: #333;
      cursor: pointer;
    }

    .content-area {
      flex-grow: 1;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
      .dashboard {
        flex-direction: column;
      }

      aside {
        width: 100%;
        height: auto;
        padding: 15px;
        position: absolute;
        z-index: 10;
        top: 0;
        left: -250px;
        transition: left 0.3s ease;
      }

      aside.collapsed {
        left: 0;
      }

      .sidebar-top ul li a {
        font-size: 14px;
      }

      .sidebar-top ul li a .fas {
        font-size: 20px;
      }

      .toggle-btn {
        display: block;
        font-size: 28px;
        margin-bottom: 15px;
      }

      .sidebar-top h2 {
        display: none;
      }

      header h1 {
        font-size: 20px;
      }

      .logout {
        margin-top: 20px;
        font-size: 14px;
      }

      .sidebar-top ul li {
        display: block;
        text-align: left;
      }

      .sidebar-top ul li a {
        padding-left: 10px;
      }
    }
  `]
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
