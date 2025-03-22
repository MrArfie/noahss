import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        animate('700ms ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(30px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ])
  ],
  template: `
    <div class="pet-detail-container" [@slideIn]>
      <!-- Back to listing button -->
      <a routerLink="/adoption" class="back-button">← Back to Pet Listing</a>

      <!-- Pet detail -->
      <div class="pet-detail" *ngIf="pet">
        <img [src]="pet.image || 'assets/pets/default.jpg'" [alt]="pet.name" class="pet-image" />
        <h1>{{ pet.name }}</h1>
        <h3>{{ pet.breed }}</h3>
        <p><strong>Age:</strong> {{ pet.age }} years</p>
        <p><strong>Description:</strong> {{ pet.description }}</p>

        <div class="adoption-status">
          <span *ngIf="pet.adopted" class="adopted">✅ Already Adopted</span>
          <a *ngIf="!pet.adopted" routerLink="/adoption-form" class="button">Adopt {{ pet.name }}</a>
        </div>
      </div>

      <!-- Loading state -->
      <div *ngIf="!pet" class="loading">
        <p>Loading pet details...</p>
      </div>
    </div>
  `,
  styles: [`
    .pet-detail-container {
      max-width: 900px;
      margin: auto;
      padding: 40px 20px;
      animation: fadeIn 1s ease-in;
    }

    .back-button {
      display: inline-block;
      margin-bottom: 25px;
      font-weight: 600;
      color: #4caf50;
      text-decoration: none;
      font-size: 16px;
      transition: color 0.3s;
    }

    .back-button:hover {
      text-decoration: underline;
      color: #2e7d32;
    }

    .pet-detail {
      text-align: center;
      background: #fff;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    }

    .pet-image {
      width: 100%;
      max-width: 350px;
      height: auto;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 20px;
      transition: transform 0.4s;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .pet-image:hover {
      transform: scale(1.03);
    }

    h1 {
      font-size: 36px;
      color: #2e7d32;
      margin-bottom: 8px;
    }

    h3 {
      font-size: 22px;
      color: #555;
      margin-bottom: 18px;
    }

    p {
      font-size: 18px;
      color: #333;
      margin: 6px 0;
    }

    .adoption-status {
      margin-top: 25px;
    }

    .adopted {
      color: #e53935;
      font-weight: bold;
      font-size: 18px;
    }

    .button {
      display: inline-block;
      margin-top: 10px;
      padding: 12px 28px;
      background: #43a047;
      color: white;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s;
    }

    .button:hover {
      background: #2e7d32;
      transform: scale(1.03);
    }

    .loading {
      text-align: center;
      padding: 50px;
      color: #777;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .pet-detail {
        padding: 20px;
      }

      h1 {
        font-size: 28px;
      }

      h3 {
        font-size: 18px;
      }

      .button {
        padding: 10px 22px;
        font-size: 15px;
      }
    }

    @media (max-width: 480px) {
      .pet-image {
        max-width: 100%;
      }

      h1 {
        font-size: 24px;
      }

      h3 {
        font-size: 16px;
      }

      p {
        font-size: 15px;
      }
    }
  `]
})
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      this.petService.getPetById(petId).subscribe({
        next: (data) => this.pet = data,
        error: (err) => {
          console.error('❌ Failed to load pet:', err);
        }
      });
    }
  }
}
