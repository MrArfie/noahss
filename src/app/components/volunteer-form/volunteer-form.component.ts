import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { VolunteerApplication } from '../../models/volunteer.model';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'app-volunteer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container fade-in">
      <h2>🙌 Volunteer Application</h2>
      <p>Join us in making a difference for rescued animals!</p>

      <form #volunteerForm="ngForm" (ngSubmit)="submitForm(volunteerForm)">
        
        <!-- Full Name -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="formData.name" required>
          <div *ngIf="volunteerForm.submitted && !formData.name" class="error">Name is required</div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" [(ngModel)]="formData.email" required>
          <div *ngIf="volunteerForm.submitted && !formData.email" class="error">Email is required</div>
        </div>

        <!-- Phone Number -->
        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" [(ngModel)]="formData.phone" required>
          <div *ngIf="volunteerForm.submitted && !formData.phone" class="error">Phone number is required</div>
        </div>

        <!-- Availability -->
        <div class="form-group">
          <label for="availability">Availability</label>
          <input type="text" id="availability" name="availability" [(ngModel)]="formData.availability" required>
          <div *ngIf="volunteerForm.submitted && !formData.availability" class="error">Please enter your availability</div>
        </div>

        <!-- Skills -->
        <div class="form-group">
          <label for="skills">Skills</label>
          <input type="text" id="skills" name="skills" [(ngModel)]="formData.skills" required>
          <div *ngIf="volunteerForm.submitted && !formData.skills" class="error">Please enter your relevant skills</div>
        </div>

        <!-- Reason for Volunteering -->
        <div class="form-group">
          <label for="reason">Why do you want to volunteer?</label>
          <textarea id="reason" name="reason" rows="3" [(ngModel)]="formData.reason" required></textarea>
          <div *ngIf="volunteerForm.submitted && !formData.reason" class="error">This field is required</div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button">Submit Application</button>

        <!-- Success Message -->
        <div *ngIf="submitted" class="success-message">
          ✅ Thank you! Your volunteer application has been submitted.
        </div>
      </form>
    </div>
  `
})
export class VolunteerFormComponent {
  formData: VolunteerApplication = { name: '', email: '', phone: '', availability: '', skills: '', reason: '', status: 'Pending' };
  submitted = false;

  constructor(private volunteerService: VolunteerService) {}

  submitForm(form: NgForm) {
    if (form.valid) {
      this.volunteerService.submitVolunteerApplication(this.formData).subscribe(() => {
        this.submitted = true;
        setTimeout(() => this.submitted = false, 5000);
        form.reset();
      });
    }
  }
}
