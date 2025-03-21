import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="logo-container">
        <a routerLink="/" class="logo-link">
          <img src="images/logo.ico" alt="Noah's Ark Logo" class="logo">
          <span class="title">Noah's Ark Shelter</span>
        </a>
      </div>

      <!-- Mobile Menu Icon -->
      <div class="menu-icon" (click)="toggleMenu()">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- Navigation Links -->
      <ul class="nav-links" [class.active]="menuOpen">
        <li><a routerLink="/" routerLinkActive="active" (click)="closeMenu()">🏠 Home</a></li>
        <li><a routerLink="/adoption" routerLinkActive="active" (click)="closeMenu()">🐾 Adoption</a></li>
        <li><a routerLink="/volunteer" routerLinkActive="active" (click)="closeMenu()">🤝 Volunteer</a></li>
        <li><a routerLink="/donation" routerLinkActive="active" (click)="closeMenu()">💖 Donate</a></li>
        <li><a routerLink="/contact" routerLinkActive="active" (click)="closeMenu()">📞 Contact</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px;
      background: #222;
      color: white;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: 1000;
      transition: all 0.3s ease-in-out;
    }

    .logo-container {
      display: flex;
      align-items: center;
    }

    .logo-link {
      display: flex;
      align-items: center;
      text-decoration: none;
    }

    .logo {
      height: 40px; /* Reduced Logo Size */
      width: auto;
      border-radius: 50%;
      transition: transform 0.3s;
    }

    .logo:hover {
      transform: scale(1.1);
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
      color: #a4c639; /* Apple Green */
      transition: color 0.3s ease-in-out;
      display: flex;
      align-items: center;
    }

    .logo-container:hover .title {
      color: #8ebf20;
    }

    .nav-links {
      display: flex;
      gap: 25px;
      list-style: none;
    }

    .nav-links li {
      display: inline-block;
    }

    .nav-links a {
      color: #f8b400;
      text-decoration: none;
      font-size: 18px;
      font-weight: bold;
      transition: 0.3s;
      position: relative;
      padding: 8px 12px;
      border-radius: 5px;
    }

    .nav-links a:hover, .nav-links a.active {
      color: #e09e00;
      background: rgba(255, 255, 255, 0.1);
    }

    /* Mobile Menu Icon */
    .menu-icon {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
    }

    .menu-icon span {
      display: block;
      width: 30px;
      height: 4px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease-in-out;
    }

    /* Mobile Responsive */
    @media (max-width: 768px) {
      .nav-links {
        display: none;
        flex-direction: column;
        background: #333;
        position: absolute;
        top: 70px;
        left: 0;
        width: 100%;
        text-align: center;
        padding: 20px;
      }

      .nav-links.active {
        display: flex;
      }

      .menu-icon {
        display: flex;
      }
    }
  `]
})
export class NavbarComponent {
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
