import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AdoptionRequest } from '../../models/adoption.model';
import { Pet } from '../../models/pet.model';
import { AdoptionService } from '../../services/adoption.service';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-adoption-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container fade-in">
      <h2>🐾 Adoption Application Form</h2>
      <p>Fill in your details to adopt a pet from Noah's Ark Shelter.</p>

      <form #adoptionForm="ngForm" (ngSubmit)="submitForm(adoptionForm)">
        
        <!-- Full Name -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="formData.name" required>
          <div *ngIf="adoptionForm.submitted && !formData.name" class="error">Name is required</div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" [(ngModel)]="formData.email" required>
          <div *ngIf="adoptionForm.submitted && !formData.email" class="error">Email is required</div>
        </div>

        <!-- Phone Number -->
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" [(ngModel)]="formData.phone" required>
          <div *ngIf="adoptionForm.submitted && !formData.phone" class="error">Phone number is required</div>
        </div>

        <!-- Select Pet -->
        <div class="form-group">
          <label for="pet">Choose a Pet</label>
          <select id="pet" name="pet" [(ngModel)]="formData.petId" required>
            <option *ngFor="let pet of pets" [value]="pet.id">{{ pet.name }} ({{ pet.breed }})</option>
          </select>
          <div *ngIf="adoptionForm.submitted && !formData.petId" class="error">Please select a pet</div>
        </div>

        <!-- Reason for Adoption -->
        <div class="form-group">
          <label for="reason">Why do you want to adopt?</label>
          <textarea id="reason" name="reason" rows="3" [(ngModel)]="formData.reason" required></textarea>
          <div *ngIf="adoptionForm.submitted && !formData.reason" class="error">This field is required</div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button">Submit Application</button>

        <!-- Success Message -->
        <div *ngIf="submitted" class="success-message">
          ✅ Thank you! Your adoption request has been submitted.
        </div>
      </form>
    </div>
  `
})
export class AdoptionFormComponent {
  pets: Pet[] = [];
  formData: AdoptionRequest = { name: '', email: '', phone: '', petId: null, reason: '', status: 'Pending' };
  submitted = false;

  constructor(private petService: PetService, private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.petService.getPets().subscribe(pets => {
      this.pets = pets;
    });
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.adoptionService.submitAdoption(this.formData).subscribe(() => {
        this.submitted = true;
        setTimeout(() => this.submitted = false, 5000);
        form.reset();
      });
    }
  }
}
