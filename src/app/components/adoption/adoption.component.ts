import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import FormsModule for search filter
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

      <!-- Search & Category Filter -->
      <div class="filters">
        <input type="text" placeholder="🔍 Search for a pet..." [(ngModel)]="searchQuery" (input)="filterPets()">
        <select [(ngModel)]="selectedCategory" (change)="filterPets()">
          <option value="">All Pets</option>
          <option value="Dog">🐶 Dogs</option>
          <option value="Cat">🐱 Cats</option>
          <option value="Other">🐾 Others</option>
        </select>
      </div>

      <!-- Pet Listings -->
      <div class="pet-list">
        <div *ngFor="let pet of filteredPets" class="pet-card" [@bounceIn] (mouseover)="wiggle = true" (mouseleave)="wiggle = false">
          <div class="pet-image" [@wiggleEffect]="wiggle ? 'wiggle' : 'normal'">
            <img [src]="pet.image" [alt]="pet.name">
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
      transition('wiggle => normal', [
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
    .filters {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .filters input, .filters select {
      padding: 10px;
      font-size: 16px;
      border-radius: 5px;
      border: 1px solid #ccc;
      text-align: center;
    }
    .pet-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin-top: 20px;
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
      background: #a4c639; /* Apple Green */
      color: white;
    }
    .pet-image {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .pet-image img {
      width: 100%;
      height: 180px;
      border-radius: 10px;
      object-fit: cover;
      transition: transform 0.5s;
    }
    .pet-card:hover img {
      transform: rotate(5deg) scale(1.05);
    }
    .pet-info h3 {
      margin-top: 10px;
      font-size: 20px;
    }
    .button {
      display: inline-block;
      margin-top: 10px;
      padding: 12px 24px;
      background: #a4c639; /* Apple Green */
      color: white;
      font-weight: bold;
      border-radius: 5px;
      text-decoration: none;
      transition: 0.3s;
    }
    .button:hover {
      background: #8ebf20;
    }
  `]
})
export class AdoptionComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchQuery: string = '';
  selectedCategory: string = '';
  wiggle = false;

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
    this.filteredPets = this.pets.filter(pet =>
      (pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (this.selectedCategory === '' || pet.category === this.selectedCategory)
    );
  }
}
