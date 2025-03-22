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
    <section class="manage-pets" @fadeIn>
      <h2>🐾 Manage Pets</h2>

      <!-- Search -->
      <input type="text" class="search-bar" placeholder="Search by name or breed..." [(ngModel)]="searchQuery" (input)="filterPets()" />

      <!-- Pet Form -->
      <form class="pet-form" (ngSubmit)="isEditing ? updatePet() : addPet()">
        <input type="text" placeholder="Name" [(ngModel)]="form.name" name="name" required />
        <input type="text" placeholder="Breed" [(ngModel)]="form.breed" name="breed" required />
        <input type="number" placeholder="Age" [(ngModel)]="form.age" name="age" required />
        <select [(ngModel)]="form.category" name="category">
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="other">Other</option>
        </select>
        <textarea placeholder="Description" [(ngModel)]="form.description" name="description"></textarea>
        <input type="file" (change)="onImageUpload($event)" />
        <div class="preview" *ngIf="form.image">
          <img [src]="form.image" alt="Preview" />
        </div>
        <div class="form-actions">
          <button type="submit">{{ isEditing ? 'Update' : 'Add' }} Pet</button>
          <button type="button" class="cancel" (click)="resetForm()">Cancel</button>
        </div>
      </form>

      <!-- Pet Table -->
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
            <th>Category</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let pet of filteredPets">
            <td><img [src]="pet.image" alt="{{ pet.name }}" /></td>
            <td>{{ pet.name }}</td>
            <td>{{ pet.breed }}</td>
            <td>{{ pet.age }}</td>
            <td>{{ pet.category }}</td>
            <td>{{ pet.adopted ? 'Adopted' : 'Available' }}</td>
            <td>
              <button class="edit" (click)="editPet(pet)">Edit</button>
              <button class="delete" (click)="deletePet(pet.id!)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .manage-pets {
      padding: 30px;
      max-width: 1100px;
      margin: auto;
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: #2e7d32;
    }

    .search-bar {
      padding: 10px;
      width: 100%;
      margin-bottom: 20px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    .pet-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-bottom: 30px;
    }

    input, select, textarea {
      padding: 10px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    textarea {
      resize: vertical;
      min-height: 60px;
    }

    .preview img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 6px;
      margin-top: 8px;
    }

    .form-actions {
      display: flex;
      gap: 10px;
    }

    button {
      padding: 10px 14px;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button.cancel {
      background-color: #e0e0e0;
    }

    button:hover {
      opacity: 0.9;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #4caf50;
      color: white;
    }

    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
      border-radius: 6px;
    }

    .edit {
      background-color: #ff9800;
      color: white;
    }

    .delete {
      background-color: #f44336;
      color: white;
      margin-left: 5px;
    }

    @media (max-width: 600px) {
      .pet-form {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ManagePetsComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  searchQuery = '';
  isEditing = false;

  form: Pet = this.getEmptyPetForm();

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
    const query = this.searchQuery.toLowerCase();
    this.filteredPets = this.pets.filter(pet =>
      pet.name.toLowerCase().includes(query) ||
      pet.breed.toLowerCase().includes(query)
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

  deletePet(id: string): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(() => this.loadPets());
    }
  }

  resetForm(): void {
    this.form = this.getEmptyPetForm();
    this.isEditing = false;
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.image = reader.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  private getEmptyPetForm(): Pet {
    return {
      id: '',
      name: '',
      breed: '',
      age: 0,
      image: '',
      description: '',
      adopted: false,
      category: 'dog'
    };
  }
}
