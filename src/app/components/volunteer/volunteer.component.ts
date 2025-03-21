import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VolunteerForm } from '../../models/volunteer-form.model'; // ✅ Fixed relative import
import { VolunteerService } from '../../services/volunteer.service'; // ✅ Fixed relative import

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [VolunteerService], // ✅ Ensure service is provided
  template: `
    <section class="volunteer-page">
      <h1>🤝 Become a Volunteer at Noah's Ark Shelter</h1>
      <p>Join our team and help provide love and care to rescued animals.</p>

      <div class="volunteer-container">
        <!-- Volunteer Information -->
        <div class="volunteer-info">
          <h2>Why Volunteer With Us? 🐾</h2>
          <ul>
            <li>💚 Help rescued animals find loving homes</li>
            <li>🏡 Be part of a compassionate & fun team</li>
            <li>📚 Gain valuable experience & training</li>
            <li>🎉 Participate in community events</li>
          </ul>
        </div>

        <!-- Volunteer Form -->
        <div class="volunteer-form">
          <h2>Apply Now! ✍️</h2>
          <form (submit)="applyForVolunteer()">
            <input type="text" placeholder="Your Name" [(ngModel)]="volunteerForm.name" name="name" required>
            <input type="email" placeholder="Your Email" [(ngModel)]="volunteerForm.email" name="email" required>
            <input type="text" placeholder="Your Phone Number" [(ngModel)]="volunteerForm.phone" name="phone" required>
            <select [(ngModel)]="volunteerForm.availability" name="availability" required>
              <option value="">Select Availability</option>
              <option value="Weekends">Weekends</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Full-Time">Full-Time</option>
            </select>
            <input type="text" placeholder="Your Skills (e.g., Animal Care, Fundraising)" [(ngModel)]="volunteerForm.skills" name="skills" required>
            <textarea placeholder="Tell us why you want to volunteer..." [(ngModel)]="volunteerForm.reason" name="reason" required></textarea>
            <button type="submit" class="button">Submit Application</button>
          </form>
        </div>
      </div>

      <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </section>
  `,
  styles: [`
    .volunteer-page {
      text-align: center;
      padding: 50px;
      max-width: 1000px;
      margin: auto;
    }
    .volunteer-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      margin-top: 30px;
    }
    .volunteer-info, .volunteer-form {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 400px;
      transition: transform 0.3s;
    }
    .volunteer-info:hover, .volunteer-form:hover {
      transform: scale(1.05);
      background: #f0f8ea;
    }
    .volunteer-info h2, .volunteer-form h2 {
      color: #2e7d32; /* Apple Green Shade */
    }
    .volunteer-info ul {
      list-style: none;
      padding: 0;
    }
    .volunteer-info ul li {
      font-size: 16px;
      margin: 10px 0;
    }
    input, textarea, select {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background: #a4c639; /* Apple Green */
      color: white;
      font-weight: bold;
      border-radius: 5px;
      text-decoration: none;
      transition: 0.3s;
      border: none;
      cursor: pointer;
      width: 100%;
      font-size: 18px;
    }
    .button:hover {
      background: #8ebf20;
    }
    .success {
      color: green;
      font-weight: bold;
      margin-top: 20px;
    }
    .error {
      color: red;
      font-weight: bold;
      margin-top: 20px;
    }
  `]
})
export class VolunteerComponent {
  volunteerForm: VolunteerForm = {
    name: '',
    email: '',
    phone: '',
    availability: '',
    skills: '',
    reason: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private volunteerService: VolunteerService) {}

  applyForVolunteer() {
    if (this.volunteerForm.name && this.volunteerForm.email && this.volunteerForm.phone && this.volunteerForm.availability && this.volunteerForm.skills && this.volunteerForm.reason) {
      this.volunteerService.submitVolunteerApplication(this.volunteerForm).subscribe(response => {
        this.successMessage = '🎉 Application submitted successfully!';
        this.errorMessage = '';
        this.resetForm();
      }, error => {
        this.successMessage = '';
        this.errorMessage = '⚠️ There was an issue submitting your application. Please try again.';
      });
    } else {
      this.errorMessage = '⚠️ Please fill out all fields before submitting.';
      this.successMessage = '';
    }
  }

  resetForm() {
    this.volunteerForm = { name: '', email: '', phone: '', availability: '', skills: '', reason: '' };
  }
}
