import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pet } from '../../../models/pet.model';
import { PetService } from '../../../services/pet.service';

@Component({
  selector: 'app-manage-pets',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ],
  template: `
    <section class="manage-pets" [@fadeIn]>
      <h2>🐾 Manage Pets</h2>

      <!-- 🔍 Search Bar -->
      <input
        type="text"
        [(ngModel)]="searchQuery"
        placeholder="🔍 Search by name or breed"
        (input)="filterPets()"
      />

      <!-- 🐶 Add/Edit Pet Form -->
      <form (ngSubmit)="isEditing ? updatePet() : addPet()" class="pet-form">
        <input [(ngModel)]="form.name" name="name" placeholder="Pet Name" required />
        <input [(ngModel)]="form.breed" name="breed" placeholder="Breed" required />
        <input type="number" [(ngModel)]="form.age" name="age" placeholder="Age" required min="0" />
        <select [(ngModel)]="form.category" name="category" required>
          <option value="" disabled>Select Category</option>
          <option value="dog">🐶 Dog</option>
          <option value="cat">🐱 Cat</option>
          <option value="other">🐾 Other</option>
        </select>
        <input [(ngModel)]="form.image" name="image" placeholder="Image URL" required />
        <textarea
          [(ngModel)]="form.description"
          name="description"
          placeholder="Description"
        ></textarea>
        <button type="submit">
          {{ isEditing ? 'Update Pet' : 'Add Pet' }}
        </button>
        <button type="button" (click)="resetForm()" *ngIf="isEditing">
          Cancel
        </button>
      </form>

      <!-- 📋 Pet List -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let pet of filteredPets">
            <td>{{ pet.name }}</td>
            <td>{{ pet.breed }}</td>
            <td>{{ pet.age }}</td>
            <td>{{ pet.category }}</td>
            <td><img [src]="pet.image || 'assets/pets/default.jpg'" [alt]="pet.name" /></td>
            <td>
              <button class="edit" (click)="editPet(pet)">✏️</button>
              <button class="delete" (click)="deletePet(pet.id!)">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .manage-pets {
      padding: 30px;
      text-align: center;
      animation: fadeIn 0.5s ease-in;
    }

    input, select, textarea {
      padding: 8px;
      margin: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 14px;
    }

    input[type="text"], input[type="number"], textarea {
      width: 220px;
    }

    select {
      width: 140px;
    }

    textarea {
      height: 60px;
      resize: vertical;
    }

    .pet-form {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-bottom: 30px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }

    img {
      width: 60px;
      height: 60px;
      border-radius: 6px;
      object-fit: cover;
    }

    button {
      padding: 8px 12px;
      margin: 2px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }

    .edit {
      background-color: #ffc107;
      color: white;
    }

    .edit:hover {
      background-color: #e0a800;
    }

    .delete {
      background-color: #f44336;
      color: white;
    }

    .delete:hover {
      background-color: #d32f2f;
    }
  `]
})
export class ManagePetsComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchQuery = '';
  isEditing = false;

  form: Pet = {
    id: 0,
    name: '',
    breed: '',
    age: 0,
    image: '',
    description: '',
    adopted: false,
    category: 'dog'
  };

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.petService.getPets().subscribe((data: Pet[]) => {
      this.pets = data;
      this.filteredPets = data;
    });
  }

  filterPets(): void {
    this.filteredPets = this.pets.filter(pet =>
      pet.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addPet(): void {
    this.petService.addPet(this.form).subscribe(() => {
      this.loadPets();
      this.resetForm();
    });
  }

  editPet(pet: Pet): void {
    this.form = { ...pet };
    this.isEditing = true;
  }

  updatePet(): void {
    if (!this.form.id) return;
    this.petService.updatePet(this.form.id, this.form).subscribe(() => {
      this.loadPets();
      this.resetForm();
    });
  }

  deletePet(id: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(() => this.loadPets());
    }
  }

  resetForm(): void {
    this.form = {
      id: 0,
      name: '',
      breed: '',
      age: 0,
      image: '',
      category: 'dog',
      adopted: false,
      description: ''
    };
    this.isEditing = false;
  }
}
