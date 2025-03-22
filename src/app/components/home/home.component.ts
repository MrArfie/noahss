import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="home-page">
      <!-- Hero Section -->
      <div class="hero" @fadeIn>
        <div class="hero-content">
          <h1>🐾 Welcome to Noah's Ark Shelter 🏡</h1>
          <p>Your support helps provide a loving home for animals in need.</p>
          <div class="cta-buttons">
            <a routerLink="/adoption" class="button">Find a Pet</a>
            <a routerLink="/donation" class="button secondary">Donate Now</a>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div class="about-section" @slideIn>
        <h2>About Us</h2>
        <p>Noah’s Ark is dedicated to rescuing, rehabilitating, and rehoming stray and abandoned animals with love and care.</p>
        <img src="assets/images/shelter.jpg" alt="Shelter Image" />
      </div>

      <!-- Gallery Section -->
      <div class="gallery-section" @fadeIn>
        <h2>📸 Life at the Shelter</h2>
        <div class="gallery">
          <img *ngFor="let image of galleryImages" [src]="image" alt="Shelter View" />
        </div>
      </div>

      <!-- Featured Pets -->
      <div class="featured-pets" @fadeIn>
        <h2>🐶 Meet Our Adorable Pets 🐱</h2>
        <div class="pet-list">
          <div *ngFor="let pet of featuredPets" class="pet-card" @hoverZoom>
            <img [src]="pet.image" [alt]="pet.name" />
            <h3>{{ pet.name }}</h3>
            <p>{{ pet.breed }}</p>
            <a [routerLink]="['/pet', pet.id]" class="button">View Details</a>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="testimonials" @slideIn>
        <h2>❤️ Happy Adoption Stories</h2>
        <div class="testimonial-card" *ngFor="let story of adoptionStories">
          <p>"{{ story.review }}"</p>
          <h4>— {{ story.name }}</h4>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta" @fadeIn>
        <h2>Every Pet Deserves a Loving Home 🏡</h2>
        <p>Join us in making a difference. Adopt, Volunteer, or Donate today!</p>
        <a routerLink="/volunteer" class="button">Become a Volunteer</a>
      </div>
    </section>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('700ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('hoverZoom', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
  styles: [`
    .home-page {
      text-align: center;
      padding: 40px 20px;
      max-width: 1200px;
      margin: auto;
    }

    /* HERO SECTION */
    .hero {
      background: linear-gradient(rgba(67, 160, 71, 0.8), rgba(67, 160, 71, 0.8)),
                  url('/images/bg.jpg') center/cover no-repeat;
      color: white;
      padding: 100px 20px;
      border-radius: 12px;
      margin-bottom: 40px;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
      position: relative;
    }

    .hero-content {
      max-width: 700px;
      margin: auto;
    }

    .hero h1 {
      font-size: 2.8rem;
      margin-bottom: 10px;
    }

    .cta-buttons {
      margin-top: 20px;
    }

    .button {
      display: inline-block;
      margin: 10px;
      padding: 12px 24px;
      background: #4caf50;
      color: white;
      font-weight: bold;
      border-radius: 6px;
      text-decoration: none;
      transition: background 0.3s;
    }

    .button.secondary {
      background: #388e3c;
    }

    .button:hover {
      background: #2e7d32;
    }

    /* COMMON BLOCKS */
    .about-section,
    .testimonials,
    .cta {
      background: #fff;
      border-radius: 10px;
      padding: 30px;
      margin: 30px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .about-section img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }

    .gallery-section {
      margin: 40px 0;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .gallery img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
    }

    .pet-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }

    .pet-card {
      background: white;
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      width: 250px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;
    }

    .pet-card:hover {
      transform: scale(1.05);
      background: #a5d6a7;
      color: white;
    }

    .pet-card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 10px;
    }

    .testimonial-card {
      background: #f1f8e9;
      padding: 20px;
      border-left: 5px solid #4caf50;
      margin: 15px auto;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
    }

    @media (max-width: 600px) {
      .hero h1 {
        font-size: 1.8rem;
      }

      .button {
        width: 100%;
        margin: 8px 0;
      }

      .pet-card {
        width: 100%;
        max-width: 300px;
      }
    }
  `]
})
export class HomeComponent {
  featuredPets = [
    { id: 1, name: 'Buddy', breed: 'Golden Retriever', image: 'assets/images/pet1.jpg' },
    { id: 2, name: 'Mittens', breed: 'Persian Cat', image: 'assets/images/pet2.jpg' },
    { id: 3, name: 'Rocky', breed: 'German Shepherd', image: 'assets/images/pet3.jpg' }
  ];

  galleryImages = [
    'assets/images/shelter1.jpg',
    'assets/images/shelter2.jpg',
    'assets/images/shelter3.jpg',
    'assets/images/shelter4.jpg',
    'assets/images/shelter5.jpg'
  ];

  adoptionStories = [
    { name: 'John & Lucy', review: 'We found our perfect pup here! Amazing experience.' },
    { name: 'Maria', review: 'Noah’s Ark helped me find my new best friend! Highly recommended.' }
  ];
}
