import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="donation-page" @fadeIn>
      <h1>💖 Support Noah's Ark Shelter</h1>
      <p>Your donation helps provide food, shelter, and medical care to rescued animals.</p>

      <div class="donation-container">
        <!-- Donation Options -->
        <div class="donation-info">
          <h2>Why Donate? 🐾</h2>
          <ul>
            <li>🍖 Provide food for rescued animals</li>
            <li>🏥 Cover medical expenses & vaccinations</li>
            <li>🏡 Improve shelter facilities & comfort</li>
            <li>🐾 Support pet adoption & rescue programs</li>
          </ul>
        </div>

        <!-- Donation Form -->
        <div class="donation-form">
          <h2>Make a Difference! 🐶🐱</h2>
          <form (submit)="submitDonation()">
            <input type="text" placeholder="Your Name" [(ngModel)]="donationData.name" name="name" required>
            <input type="email" placeholder="Your Email" [(ngModel)]="donationData.email" name="email" required>
            <select [(ngModel)]="donationData.amount" name="amount" required>
              <option value="">Select Amount</option>
              <option value="100">₱100</option>
              <option value="500">₱500</option>
              <option value="1000">₱1000</option>
              <option value="custom">Other Amount</option>
            </select>
            <input *ngIf="donationData.amount === 'custom'" type="number" placeholder="Enter Custom Amount" [(ngModel)]="donationData.customAmount" name="customAmount" required>
            
            <h3>Donate via GCash 📱</h3>
            <div class="gcash-details">
              <img src="data:image/jpeg;base64,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" alt="GCash Logo" class="gcash-logo">
              <p><strong>GCash Number:</strong> 09123456789</p>
              <p><strong>Account Name:</strong> Noah's Ark Shelter</p>
            </div>

            <button type="submit" class="button">Donate Now</button>
          </form>
        </div>
      </div>

      <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </section>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('0.8s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  styles: [`
    .donation-page {
      text-align: center;
      padding: 50px;
      max-width: 1000px;
      margin: auto;
    }
    .donation-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      margin-top: 30px;
    }
    .donation-info, .donation-form {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 400px;
      transition: transform 0.3s;
    }
    .donation-info:hover, .donation-form:hover {
      transform: scale(1.05);
      background: #f0f8ea;
    }
    .donation-info h2, .donation-form h2 {
      color: #2e7d32; /* Apple Green Shade */
    }
    .donation-info ul {
      list-style: none;
      padding: 0;
    }
    .donation-info ul li {
      font-size: 16px;
      margin: 10px 0;
    }
    input, select {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }
    .gcash-details {
      text-align: center;
      margin-top: 10px;
    }
    .gcash-logo {
      width: 100px;
      height: auto;
      margin-bottom: 10px;
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
export class DonationComponent {
  donationData = {
    name: '',
    email: '',
    amount: '',
    customAmount: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  submitDonation() {
    if (this.donationData.name && this.donationData.email && (this.donationData.amount || this.donationData.customAmount)) {
      this.successMessage = '🎉 Thank you for your donation!';
      this.errorMessage = '';
      this.resetForm();
    } else {
      this.successMessage = '';
      this.errorMessage = '⚠️ Please fill out all fields before submitting.';
    }
  }

  resetForm() {
    this.donationData = { name: '', email: '', amount: '', customAmount: '' };
  }
}
