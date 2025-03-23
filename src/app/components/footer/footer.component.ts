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

        <!-- Social Media and GIF -->
        <div class="footer-social-gif">
          <div class="footer-social">
            <h3>Follow Us</h3>
            <div class="social-icons">
              <a href="https://www.facebook.com/Noahsarkdogandcatshelter" target="_blank">
                <img src="images/fb.png" alt="Facebook">
              </a>
              <a href="https://www.instagram.com/noahsark" target="_blank">
                <img src="images/in.jpg" alt="Instagram">
              </a>
              <a href="https://twitter.com/noahsark" target="_blank">
                <img src="images/twit.png" alt="Twitter">
              </a>
            </div>
          </div>
          
          <!-- GIF of man stroking his dog -->
          <div class="footer-gif">
            <img src="images/24.gif" alt="Man stroking his dog" class="footer-gif-img">
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
      background: #1c1c1c;
      color: #e0e0e0;
      padding: 60px 20px;
      font-size: 16px;
      position: relative;
      overflow: hidden;
      font-family: 'Roboto', sans-serif;
    }

    .footer-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      max-width: 1200px;
      margin: auto;
      gap: 40px;
    }

    .footer-logo {
      text-align: center;
      flex: 1 1 250px;
    }

    .footer-logo img {
      width: 100px;
      margin-bottom: 15px;
    }

    .footer-logo h2 {
      color: #f8b400;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .footer-logo p {
      font-size: 16px;
      color: #e0e0e0;
    }

    .footer-links, .footer-contact {
      max-width: 250px;
      flex: 1 1 250px;
    }

    .footer-links h3, .footer-contact h3 {
      color: #a4c639;
      font-size: 20px;
      margin-bottom: 10px;
    }

    .footer-links ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-links ul li {
      margin: 8px 0;
    }

    .footer-links ul li a {
      color: #e0e0e0;
      text-decoration: none;
      font-size: 16px;
      transition: color 0.3s ease-in-out;
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

    /* Combine social media icons and GIF */
    .footer-social-gif {
      display: flex;
      flex-direction: row; /* Align social icons and GIF side by side */
      gap: 30px; /* Space between the items */
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }

    .footer-social .social-icons {
      display: flex;
      gap: 20px;
      margin-top: 15px;
    }

    .footer-social .social-icons a {
      display: inline-block;
      transition: transform 0.3s ease-in-out;
    }

    .footer-social .social-icons a:hover {
      transform: scale(1.1);
    }

    .footer-social .social-icons img {
      width: 35px;
      height: 35px; /* Ensures the icons have the same size */
      object-fit: contain; /* Prevents stretching or distortion of the images */
      transition: opacity 0.3s ease-in-out;
    }

    .footer-social .social-icons img:hover {
      opacity: 0.8;
    }

    .footer-gif {
      max-width: 250px;
      flex: 1 1 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }

    .footer-gif-img {
      max-width: 100%;
      height: auto;
      border-radius: 15px;
      transition: transform 0.3s ease-in-out;
    }

    .footer-gif-img:hover {
      transform: scale(1.05);
    }

    .footer-bottom {
      text-align: center;
      margin-top: 40px;
      border-top: 1px solid #444;
      padding-top: 15px;
      font-size: 14px;
    }

    .footer-bottom p {
      color: #e0e0e0;
    }

    @media (max-width: 768px) {
      .footer-container {
        flex-direction: column;
        align-items: center;
        gap: 30px;
      }

      .footer-logo, .footer-links, .footer-contact {
        max-width: 100%;
        text-align: center;
      }

      .footer-social-gif {
        flex-direction: column;
        align-items: center;
      }

      .footer-gif {
        margin-top: 25px;
      }
    }
  `]
})
export class FooterComponent {}
