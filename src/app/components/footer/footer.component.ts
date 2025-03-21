import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer">
      <div class="footer-container">
        
        <!-- Logo & Mission -->
        <div class="footer-logo">
          <img src="images/logo.ico" alt="Noah's Ark Logo">
          <h2>Noah's Ark Shelter</h2>
          <p>Providing a safe haven for animals in need.</p>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a routerLink="/">🏠 Home</a></li>
            <li><a routerLink="/adoption">🐾 Adoption</a></li>
            <li><a routerLink="/volunteer">🤝 Volunteer</a></li>
            <li><a routerLink="/donation">💖 Donate</a></li>
            <li><a routerLink="/contact">📞 Contact</a></li>
          </ul>
        </div>

        <!-- Contact Information -->
        <div class="footer-contact">
          <h3>📍 Contact Us</h3>
          <p><strong>📍 Address:</strong> 123 Animal Shelter Road, Pampanga</p>
          <p><strong>📞 Phone:</strong> <a href="tel:+639171234567">0917-123-4567</a></p>
          <p><strong>📧 Email:</strong> <a href="mailto:info&#64;noahsark.org">info&#64;noahsark.org</a></p>
        </div>

        <!-- Social Media -->
        <div class="footer-social">
          <h3>Follow Us</h3>
          <div class="social-icons">
            <a href="https://www.facebook.com/Noahsarkdogandcatshelter" target="_blank">
              <img src="assets/images/facebook-icon.png" alt="Facebook">
            </a>
            <a href="https://www.instagram.com/noahsark" target="_blank">
              <img src="assets/images/instagram-icon.png" alt="Instagram">
            </a>
            <a href="https://twitter.com/noahsark" target="_blank">
              <img src="assets/images/twitter-icon.png" alt="Twitter">
            </a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2025 Noah's Ark Shelter | All Rights Reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: #222;
      color: white;
      padding: 40px 0;
      font-size: 16px;
    }
    .footer-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      max-width: 1200px;
      margin: auto;
      padding: 20px;
    }
    .footer-logo {
      text-align: center;
      max-width: 250px;
    }
    .footer-logo img {
      width: 80px;
      margin-bottom: 10px;
    }
    .footer-logo h2 {
      color: #f8b400;
    }
    .footer-links, .footer-contact, .footer-social {
      max-width: 250px;
    }
    .footer-links h3, .footer-contact h3, .footer-social h3 {
      color: #a4c639; /* Apple Green */
    }
    .footer-links ul {
      list-style: none;
      padding: 0;
    }
    .footer-links ul li {
      margin: 5px 0;
    }
    .footer-links ul li a {
      color: white;
      text-decoration: none;
      transition: color 0.3s;
    }
    .footer-links ul li a:hover {
      color: #a4c639;
    }
    .footer-contact a {
      color: #a4c639;
      text-decoration: none;
      font-weight: bold;
    }
    .footer-contact a:hover {
      text-decoration: underline;
    }
    .footer-social .social-icons {
      display: flex;
      gap: 15px;
      margin-top: 10px;
    }
    .footer-social .social-icons a {
      display: inline-block;
      transition: transform 0.3s;
    }
    .footer-social .social-icons a:hover {
      transform: scale(1.1);
    }
    .footer-social .social-icons img {
      width: 30px;
    }
    .footer-bottom {
      text-align: center;
      margin-top: 20px;
      border-top: 1px solid #444;
      padding-top: 10px;
    }
  `]
})
export class FooterComponent {}
