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
        <button class="logout" (click)="logout()" [title]="'Logout'">
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
    * {
      box-sizing: border-box;
    }

    .dashboard {
      display: flex;
      height: 100vh;
      overflow: hidden;
      background-color: #f4f6f9;
    }

    aside {
      width: 260px;
      background: #1e293b;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: width 0.3s ease;
      padding: 20px 15px;
    }

    aside.collapsed {
      width: 80px;
    }

    .sidebar-top h2 {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 30px;
      color: #60a5fa;
      white-space: nowrap;
    }

    ul {
      list-style: none;
      padding: 0;
    }

    li {
      margin-bottom: 20px;
    }

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
      text-decoration: none;
      padding: 10px 12px;
      border-radius: 6px;
      transition: background 0.3s, transform 0.2s;
    }

    a.active,
    a:hover {
      background-color: #334155;
      transform: translateX(4px);
    }

    .logout {
      background: #ef4444;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.3s ease;
    }

    .logout:hover {
      background: #dc2626;
    }

    main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: white;
      padding: 15px 25px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.05);
      border-bottom: 1px solid #e5e7eb;
    }

    .toggle-btn {
      font-size: 20px;
      background: none;
      border: none;
      cursor: pointer;
      color: #374151;
    }

    .left h1 {
      font-size: 18px;
      margin-left: 15px;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .right .profile-icon {
      font-size: 28px;
      color: #60a5fa;
    }

    .content-area {
      flex-grow: 1;
      padding: 25px;
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      aside {
        width: 70px;
        padding: 15px 10px;
      }

      aside h2,
      aside span {
        display: none;
      }

      a {
        justify-content: center;
      }

      header h1 {
        font-size: 16px;
      }

      .content-area {
        padding: 15px;
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
