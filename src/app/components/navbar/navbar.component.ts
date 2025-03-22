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
        <!-- 🏠 Noah's Ark Logo + Title -->
        <img src="images/logo.ico" alt="Noah's Ark Logo" class="logo" />
        <h1 class="title">Noah's Ark</h1>
      </div>

      <!-- 🐶 Running Dog Animation -->
      <div class="dog-container">
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

      <!-- 🍔 Mobile Menu -->
      <div class="hamburger" (click)="toggleMenu()">
        <span [class.active]="menuOpen"></span>
        <span [class.active]="menuOpen"></span>
        <span [class.active]="menuOpen"></span>
      </div>
    </nav>
  `,
  styles: [`
    /* ✨ Navbar Styling */
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 30px;
      background-color: white; /* ✅ Green Theme */
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      position: relative;
      top: 0;
      z-index: 1000;
      overflow: hidden;
    }

    /* 🔧 Left Section: Logo + Title */
    .left-section {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    /* 🏠 Logo Image */
    .logo {
      height: 50px;
      object-fit: contain;
      max-width: 100%;
    }

    /* 🏷️ Title beside the logo */
    .title {
      font-size: 22px;
      font-weight: bold;
      color: green; /* ✅ Green Theme */
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
    }

    /* 🐶 Running Dog Animation */
    .dog-container {
      position: absolute;
      top: 50%;
      left: -100px;
      transform: translateY(-50%);
      animation: moveDog 6s linear infinite;
    }

    .running-dog {
      width: 60px;
      height: auto;
    }

    @keyframes moveDog {
      0% { left: -100px; }
      100% { left: 100%; }
    }

    /* 🔗 Navigation Links */
    .nav-links {
      list-style: none;
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .nav-links a {
      text-decoration: none;
      color: black; /* ✅ Green Theme */
      font-weight: 500;
      font-size: 16px;
      transition: color 0.3s ease-in-out;
    }

    .nav-links a:hover, .nav-links a.active {
      color: #C8E6C9;
      font-weight: bold;
    }

    /* 🔑 Authentication Buttons */
    .auth {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .welcome {
      color: white;
      font-weight: 500;
    }

    /* 🚀 Login & Register Buttons */
    .btn {
      background-color: #2E7D32;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: bold;
      text-decoration: none;
      transition: background 0.3s;
      cursor: pointer;
    }

    .btn:hover {
      background-color: #1B5E20;
    }

    .btn.logout {
      background-color: #D32F2F;
      border-radius: 6px;
      padding: 8px 20px;
    }

    .btn.logout:hover {
      background-color: #B71C1C;
    }

    .btn.register {
      background: none;
      border: 2px solid white;
      color: white;
    }

    .btn.register:hover {
      background: white;
      color: #4CAF50;
    }

    /* 🍔 Mobile Menu Button */
    .hamburger {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 4px;
    }

    .hamburger span {
      width: 25px;
      height: 3px;
      background-color: white;
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

    /* 📱 Responsive Navbar */
    @media (max-width: 768px) {
      .hamburger { display: flex; }

      .nav-links {
        position: absolute;
        top: 70px;
        left: 0;
        right: 0;
        background-color: #4CAF50;
        flex-direction: column;
        gap: 15px;
        padding: 20px;
        display: none;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }

      .nav-links.open { display: flex; }

      .auth {
        flex-direction: column;
        width: 100%;
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
