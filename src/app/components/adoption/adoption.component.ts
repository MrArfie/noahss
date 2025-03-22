import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-adoption',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <section class="adoption-page fade-in">
      <h1>🐶 Find Your New Best Friend 🐱</h1>
      <p>Browse our adorable rescue pets and give them a forever home.</p>

      <!-- Search & Filter -->
      <div class="filters">
        <input
          type="text"
          placeholder="🔍 Search for a pet..."
          [(ngModel)]="searchQuery"
          (input)="filterPets()"
        />
        <select [(ngModel)]="selectedCategory" (change)="filterPets()">
          <option value="">All Pets</option>
          <option value="dog">🐶 Dogs</option>
          <option value="cat">🐱 Cats</option>
          <option value="other">🐾 Others</option>
        </select>
      </div>

      <!-- Pet Cards -->
      <div class="pet-list">
        <div
          *ngFor="let pet of filteredPets"
          class="pet-card"
          [@bounceIn]
          (mouseenter)="hoveredPetId = pet.id ?? null"
          (mouseleave)="hoveredPetId = null"
        >
          <div class="pet-image" [@wiggleEffect]="hoveredPetId === pet.id ? 'wiggle' : 'normal'">
            <img [src]="pet.image || 'assets/pets/default.jpg'" [alt]="pet.name" />
          </div>
          <div class="pet-info">
            <h3>{{ pet.name }}</h3>
            <p><strong>Breed:</strong> {{ pet.breed }}</p>
            <p><strong>Age:</strong> {{ pet.age }} years old</p>
            <a [routerLink]="['/pet', pet.id]" class="button">View Details</a>
          </div>
        </div>
      </div>
    </section>
  `,
  animations: [
    trigger('bounceIn', [
      transition(':enter', [
        animate('0.8s ease-out', keyframes([
          style({ opacity: 0, transform: 'translateY(-50px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
        ]))
      ])
    ]),
    trigger('wiggleEffect', [
      transition('normal => wiggle', [
        animate('0.5s ease-in-out', keyframes([
          style({ transform: 'rotate(0deg)', offset: 0 }),
          style({ transform: 'rotate(5deg)', offset: 0.2 }),
          style({ transform: 'rotate(-5deg)', offset: 0.4 }),
          style({ transform: 'rotate(3deg)', offset: 0.6 }),
          style({ transform: 'rotate(-3deg)', offset: 0.8 }),
          style({ transform: 'rotate(0deg)', offset: 1 })
        ]))
      ])
    ])
  ],
  styles: [`
    .adoption-page {
      text-align: center;
      padding: 50px;
      max-width: 1100px;
      margin: auto;
    }

    h1 {
      font-size: 2.2rem;
      margin-bottom: 10px;
      color: #2e7d32;
    }

    .filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin: 20px 0;
      flex-wrap: wrap;
    }

    .filters input, .filters select {
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      text-align: center;
      min-width: 200px;
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
      transition: transform 0.3s ease-in-out;
    }

    .pet-card:hover {
      transform: scale(1.05);
      background: #a4c639;
      color: white;
    }

    .pet-image img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 10px;
      transition: transform 0.3s;
    }

    .pet-info h3 {
      margin-top: 10px;
      font-size: 20px;
    }

    .pet-info p {
      font-size: 14px;
      margin: 4px 0;
    }

    .button {
      display: inline-block;
      margin-top: 10px;
      padding: 10px 20px;
      background: #43a047;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      text-decoration: none;
      transition: background 0.3s;
    }

    .button:hover {
      background: #2e7d32;
    }

    @media (max-width: 600px) {
      .filters {
        flex-direction: column;
      }

      .pet-card {
        width: 100%;
        max-width: 320px;
      }
    }
  `]
})
export class AdoptionComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  hoveredPetId: string | null = null;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getPets().subscribe((data) => {
      this.pets = data;
      this.filteredPets = data;
    });
  }

  filterPets(): void {
    const query = this.searchQuery.toLowerCase();
    const category = this.selectedCategory.toLowerCase();

    this.filteredPets = this.pets.filter(pet =>
      (pet.name.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query)) &&
      (!category || pet.category.toLowerCase() === category)
    );
  }
}
