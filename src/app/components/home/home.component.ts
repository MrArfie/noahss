import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="home-page">
      <!-- Hero Section -->
      <div class="hero" @fadeIn>
        <div class="hero-content">
          <h1>🐾 Welcome to Noah's Ark Shelter</h1>
          <p>Your kindness provides love, safety, and second chances to homeless pets.</p>
          <div class="cta-buttons">
            <a routerLink="/adoption" class="button">Find a Pet</a>
            <a routerLink="/donation" class="button secondary">Donate Now</a>
          </div>
        </div>
      </div>

      <!-- About Us -->
      <div class="about-section" @slideIn>
        <h2>About Us</h2>
        <p>Noah’s Ark is a compassionate animal rescue dedicated to providing loving homes for every furry friend we save.</p>
        <img src="/images/bg2.jpg" alt="Shelter" />
      </div>

      <!-- Gallery Section -->
      <div class="gallery-section" @fadeIn>
        <h2>📸 Life at the Shelter</h2>
        <div class="gallery">
          <img src="/images/2.jpg" alt="Shelter View 1" />
          <img src="/images/8.jpg" alt="Shelter View 2" />
          <img src="/images/6.jpg" alt="Shelter View 3" />
          <img src="/images/4.jpg" alt="Shelter View 4" />
          <img src="/images/5.jpg" alt="Shelter View 5" />
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
            <a [routerLink]="['/pet', pet._id]" class="button">View Details</a>
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
        <h2>Help us give every animal a forever home 🏡</h2>
        <p>Adopt, volunteer, or donate today and be part of a pet’s journey to love.</p>
        <a routerLink="/volunteer" class="button">Become a Volunteer</a>
      </div>
    </section>
  `,
  styles: [`
    .home-page {
      padding: 40px 20px;
      max-width: 1200px;
      margin: auto;
    }

    .hero {
      background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/bg.jpg') center/cover no-repeat;
      color: white;
      padding: 100px 20px;
      border-radius: 12px;
      margin-bottom: 40px;
      text-align: center;
    }

    .hero-content {
      max-width: 700px;
      margin: auto;
    }

    h1 {
      font-size: 2.8rem;
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
      transition: transform 0.3s, background 0.3s;
    }

    .button:hover {
      background: #2e7d32;
      transform: translateY(-2px);
    }

    .button.secondary {
      background: #388e3c;
    }

    .about-section,
    .testimonials,
    .cta {
      background: white;
      padding: 30px;
      border-radius: 10px;
      margin: 40px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .about-section img {
      margin-top: 20px;
      width: 100%;
      border-radius: 10px;
    }

    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin-top: 20px;
    }

    .gallery img {
      width: 100%;
      height: 160px;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .gallery img:hover {
      transform: scale(1.05);
    }

    .pet-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
    }

    .pet-card {
      background: white;
      padding: 20px;
      width: 250px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .pet-card:hover {
      transform: scale(1.05);
      background: #c8e6c9;
    }

    .pet-card img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
    }

    .testimonial-card {
      background: #f1f8e9;
      padding: 20px;
      margin: 15px auto;
      border-left: 5px solid #4caf50;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
    }

    @media (max-width: 600px) {
      h1 {
        font-size: 2rem;
      }

      .button {
        width: 100%;
        margin: 8px 0;
      }

      .pet-card {
        width: 100%;
      }
    }
  `],
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
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('hoverZoom', [
      transition(':enter', [
        style({ transform: 'scale(0.95)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  featuredPets: Pet[] = [];
  adoptionStories = [
    { name: 'John & Lucy', review: 'We found our perfect pup here! Amazing experience.' },
    { name: 'Maria', review: 'Noah’s Ark helped me find my new best friend! Highly recommended.' }
  ];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe({
      next: pets => {
        this.featuredPets = pets.slice(0, 3); // Limit to first 3
      },
      error: err => {
        console.error('❌ Error loading pets:', err);
      }
    });
  }
}
