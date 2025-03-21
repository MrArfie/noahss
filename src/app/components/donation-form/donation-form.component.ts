import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { VolunteerApplication } from '../../models/volunteer.model';
import { VolunteerService } from '../../services/volunteer.service';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="volunteer-container fade-in">
      <h2>🙌 Become a Volunteer</h2>
      <p>Help us care for rescued animals by joining our team of dedicated volunteers.</p>

      <div class="form-container">
        <h3>📩 Volunteer Application</h3>
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

          <button type="submit" class="button">Submit Application</button>

          <!-- Success Message -->
          <div *ngIf="submitted" class="success-message">
            ✅ Thank you! Your volunteer application has been submitted.
          </div>
        </form>
      </div>

      <!-- Display Volunteer Applications -->
      <div class="applications-container" *ngIf="applications.length > 0">
        <h3>📋 Submitted Applications</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let app of applications">
              <td>{{ app.name }}</td>
              <td>{{ app.email }}</td>
              <td [ngClass]="{'approved': app.status === 'Approved', 'pending': app.status === 'Pending', 'rejected': app.status === 'Rejected'}">
                {{ app.status }}
              </td>
              <td>{{ app.createdAt | date:'short' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  styles: [`
    .volunteer-container {
      text-align: center;
      padding: 50px;
      max-width: 800px;
      margin: auto;
    }
    .form-container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
    }
    .applications-container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
      text-align: left;
    }
    .form-group {
      margin-bottom: 15px;
    }
    label {
      font-weight: bold;
      display: block;
      margin-bottom: 5px;
    }
    input, textarea {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: none;
      background: #fff;
      font-size: 16px;
    }
    .error {
      color: red;
      font-size: 14px;
      margin-top: 5px;
    }
    .button {
      width: 100%;
      padding: 12px;
      background: #f8b400;
      color: white;
      font-weight: bold;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      transition: 0.3s;
    }
    .button:hover {
      background: #e09e00;
    }
    .success-message {
      margin-top: 20px;
      padding: 10px;
      background: green;
      color: white;
      text-align: center;
      border-radius: 5px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
    th {
      background: #f8b400;
      color: white;
    }
    .approved {
      color: green;
    }
    .pending {
      color: orange;
    }
    .rejected {
      color: red;
    }
  `]
})
export class VolunteerComponent implements OnInit {
  formData: VolunteerApplication = { name: '', email: '', phone: '', availability: '', skills: '', reason: '', status: 'Pending' };
  submitted = false;
  applications: VolunteerApplication[] = [];

  constructor(private volunteerService: VolunteerService) {}

  ngOnInit() {
    this.loadApplications();
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.volunteerService.submitVolunteerApplication({
        ...this.formData,
        createdAt: new Date()
      }).subscribe(() => {
        this.submitted = true;
        setTimeout(() => this.submitted = false, 5000);
        form.reset();
        this.loadApplications();
      });
    }
  }

  loadApplications() {
    this.volunteerService.getVolunteerApplications().subscribe(apps => {
      this.applications = apps;
    });
  }
}
export class DonationFormComponent { }