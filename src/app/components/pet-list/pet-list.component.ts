import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <section class="pet-list">
      <h2>🐾 Pets Available for Adoption</h2>

      <div class="pet-grid">
        <div class="pet-card" *ngFor="let pet of pets" [@fadeInUp]>
          <img [src]="Array.isArray(pet.image) ? pet.image[0] : pet.image" [alt]="pet.name" />
          <div class="pet-info">
            <h3>{{ pet.name }}</h3>
            <p>{{ pet.breed }} • {{ pet.age }} yrs</p>
            <span class="tag" [ngClass]="{ adopted: pet.adopted, available: !pet.adopted }">
              {{ pet.adopted ? 'Adopted' : 'Available' }}
            </span>
            <br />
            <a [routerLink]="['/pet', pet.id]" class="view-btn">👁️ View Details</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .pet-list {
      padding: 40px;
      text-align: center;
    }

    .pet-list h2 {
      font-size: 2rem;
      margin-bottom: 30px;
      color: #2e7d32;
    }

    .pet-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 25px;
      justify-items: center;
    }

    .pet-card {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      transition: transform 0.3s, box-shadow 0.3s;
      width: 100%;
      max-width: 300px;
    }

    .pet-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 15px rgba(0,0,0,0.2);
    }

    .pet-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .pet-info {
      padding: 15px;
      text-align: left;
    }

    .pet-info h3 {
      margin: 0 0 5px;
      font-size: 1.3rem;
      color: #4caf50;
    }

    .pet-info p {
      margin: 0 0 10px;
      font-size: 0.95rem;
      color: #555;
    }

    .tag {
      display: inline-block;
      padding: 6px 12px;
      font-size: 0.8rem;
      border-radius: 50px;
      font-weight: bold;
    }

    .available {
      background-color: #c8e6c9;
      color: #2e7d32;
    }

    .adopted {
      background-color: #ffcdd2;
      color: #c62828;
    }

    .view-btn {
      display: inline-block;
      margin-top: 10px;
      padding: 6px 12px;
      background: #2196f3;
      color: white;
      font-size: 0.85rem;
      text-decoration: none;
      border-radius: 6px;
      transition: background 0.3s ease;
    }

    .view-btn:hover {
      background: #1976d2;
    }

    @media (max-width: 600px) {
      .pet-list {
        padding: 20px;
      }
    }
  `]
})
export class PetListComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe(data => {
      this.pets = data;
    });
  }
}
