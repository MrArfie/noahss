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
        <h1>🐾 Welcome to Noah's Ark Shelter 🏡</h1>
        <p>Your support helps provide a loving home for animals in need.</p>
        <div class="cta-buttons">
          <a routerLink="/adoption" class="button">Find a Pet</a>
          <a routerLink="/donation" class="button secondary">Donate Now</a>
        </div>
      </div>

      <!-- About Us Section -->
      <div class="about-section" @slideIn>
        <h2>About Us</h2>
        <p>We are dedicated to rescuing, rehabilitating, and rehoming stray and abandoned animals.</p>
        <img src="images/shelter.jpg" alt="Shelter Image">
      </div>

      <!-- Featured Pets -->
      <div class="featured-pets">
        <h2>🐶 Meet Our Adorable Pets 🐱</h2>
        <div class="pet-list">
          <div *ngFor="let pet of featuredPets" class="pet-card" @hoverEffect>
            <img [src]="pet.image" [alt]="pet.name">
            <h3>{{ pet.name }}</h3>
            <p>{{ pet.breed }}</p>
            <a [routerLink]="['/pet', pet.id]" class="button">View Details</a>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="testimonials" @fadeIn>
        <h2>🐾 Happy Adoption Stories ❤️</h2>
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
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('0.8s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('hoverEffect', [
      transition(':enter', [
        style({ transform: 'scale(0.9)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ],
  styles: [`
    .home-page {
      text-align: center;
      padding: 50px;
      max-width: 1100px;
      margin: auto;
    }
    .hero {
      background: rgba(0, 0, 0, 0.6);
      color: white;
      padding: 60px 20px;
      border-radius: 10px;
    }
    .hero h1 {
      font-size: 40px;
      margin-bottom: 10px;
    }
    .cta-buttons {
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      margin: 10px;
      padding: 12px 24px;
      background: #f8b400;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      text-decoration: none;
      transition: 0.3s;
    }
    .button.secondary {
      background: #e09e00;
    }
    .button:hover {
      background: #e09e00;
    }
    .about-section {
      margin-top: 50px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 10px;
    }
    .about-section img {
      width: 100%;
      border-radius: 10px;
      margin-top: 20px;
    }
    .featured-pets {
      margin-top: 50px;
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
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 250px;
      transition: transform 0.3s;
    }
    .pet-card:hover {
      transform: scale(1.05);
      background: #f8b400;
      color: white;
    }
    .pet-card img {
      width: 100%;
      height: 180px;
      border-radius: 10px;
      object-fit: cover;
    }
    .testimonials {
      margin-top: 50px;
      background: rgba(255, 255, 255, 0.9);
      padding: 30px;
      border-radius: 10px;
    }
    .testimonial-card {
      padding: 20px;
      border-left: 5px solid #f8b400;
      margin: 10px auto;
      width: 80%;
      background: #fff;
      border-radius: 10px;
    }
    .cta {
      margin-top: 40px;
      padding: 20px;
      background: rgba(248, 180, 0, 0.1);
      border-radius: 10px;
    }
  `]
})
export class HomeComponent {
  featuredPets = [
    { id: 1, name: 'Buddy', breed: 'Golden Retriever', image: 'assets/images/pet1.jpg' },
    { id: 2, name: 'Mittens', breed: 'Persian Cat', image: 'assets/images/pet2.jpg' },
    { id: 3, name: 'Rocky', breed: 'German Shepherd', image: 'assets/images/pet3.jpg' }
  ];

  adoptionStories = [
    { name: 'John & Lucy', review: 'We found our perfect pup here! Amazing experience.' },
    { name: 'Maria', review: 'Noah’s Ark helped me find my new best friend! Highly recommended.' }
  ];
}
