import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <nav class="navbar" [@slideDown]>
      <div class="left-section">
        <img src="images/logo.ico" alt="Noah's Ark Logo" class="logo" />
        <h1 class="title">Noah's Ark</h1>
      </div>

      <div class="dog-container" aria-hidden="true">
        <img src="images/running-dog.gif" alt="Running Dog" class="running-dog" />
      </div>

      <ul class="nav-links" [class.open]="menuOpen">
        <li><a routerLink="/" routerLinkActive="active" (click)="closeMenu()">Home</a></li>
        <li><a routerLink="/adoption" routerLinkActive="active" (click)="closeMenu()">Adopt</a></li>
        <li><a routerLink="/donation" routerLinkActive="active" (click)="closeMenu()">Donate</a></li>
        <li><a routerLink="/volunteer" routerLinkActive="active" (click)="closeMenu()">Volunteer</a></li>
        <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">Contact</a></li>

        <ng-container *ngIf="isLoggedIn; else guest">
          <li class="auth">
            <span class="welcome">👋 Hi, {{ user?.name }}!</span>
            <a class="btn logout" (click)="logout()">Logout</a>
          </li>
        </ng-container>

        <ng-template #guest>
          <li class="auth">
            <a routerLink="/login" class="btn login" (click)="closeMenu()">Login</a>
            <a routerLink="/register" class="btn register" (click)="closeMenu()">Register</a>
          </li>
        </ng-template>
      </ul>

      <div class="hamburger" (click)="toggleMenu()" aria-label="Toggle Menu">
        <span [class.active]="menuOpen"></span>
        <span [class.active]="menuOpen"></span>
        <span [class.active]="menuOpen"></span>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 30px;
      background-color: #fff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .logo {
      height: 45px;
    }

    .title {
      font-size: 22px;
      font-weight: bold;
      color: green;
      margin: 0;
    }

    .dog-container {
      position: absolute;
      top: 50%;
      left: -80px;
      transform: translateY(-50%);
      animation: moveDog 6s linear infinite;
    }

    .running-dog {
      width: 55px;
      height: auto;
    }

    @keyframes moveDog {
      0% { left: -100px; }
      100% { left: 100%; }
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: black;
      font-weight: 500;
      font-size: 16px;
      transition: color 0.3s ease-in-out;
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: #7bbf1a;
      font-weight: bold;
    }

    .auth {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .welcome {
      color: #333;
      font-weight: 500;
    }

    .btn {
      background: #2e7d32;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s;
      text-decoration: none;
    }

    .btn.logout {
      background: #d32f2f;
    }

    .btn:hover {
      background: #1b5e20;
    }

    .btn.register {
      background: none;
      border: 2px solid #2e7d32;
      color: #2e7d32;
    }

    .btn.register:hover {
      background: #2e7d32;
      color: white;
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background: #333;
      transition: all 0.3s;
    }

    .hamburger span.active:nth-child(1) {
      transform: rotate(45deg) translateY(6px);
    }

    .hamburger span.active:nth-child(2) {
      opacity: 0;
    }

    .hamburger span.active:nth-child(3) {
      transform: rotate(-45deg) translateY(-6px);
    }

    @media (max-width: 768px) {
      .hamburger {
        display: flex;
      }

      .nav-links {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background-color: #f5f5f5;
        flex-direction: column;
        gap: 15px;
        padding: 20px;
        display: none;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }

      .nav-links.open {
        display: flex;
      }

      .auth {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  menuOpen = false;
  isLoggedIn = false;
  user: any = null;

  private authSub!: Subscription;
  private userSub!: Subscription;

  authService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
    });

    this.userSub = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
    this.userSub?.unsubscribe();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeMenu();
  }
}
