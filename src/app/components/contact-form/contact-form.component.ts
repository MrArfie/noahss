import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container fade-in">
      <h2>📩 Contact Us</h2>
      <p>Have any questions? Send us a message below!</p>

      <form #contactForm="ngForm" (ngSubmit)="submitForm(contactForm)">
        
        <!-- Full Name -->
        <div class="form-group">
          <label for="name">Full Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="formData.name" required>
          <div *ngIf="contactForm.submitted && !formData.name" class="error">Name is required</div>
        </div>

        <!-- Email -->
        <div class="form-group">
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" [(ngModel)]="formData.email" required>
          <div *ngIf="contactForm.submitted && !formData.email" class="error">Email is required</div>
        </div>

        <!-- Message -->
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="3" [(ngModel)]="formData.message" required></textarea>
          <div *ngIf="contactForm.submitted && !formData.message" class="error">Message is required</div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button">Send Message</button>

        <!-- Success Message -->
        <div *ngIf="submitted" class="success-message">
          ✅ Thank you! Your message has been sent.
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    h2 { text-align: center; color: #f8b400; }
    .form-group { margin-bottom: 15px; }
    label { font-weight: bold; display: block; margin-bottom: 5px; }
    input, textarea {
      width: 100%;
      padding: 10px;
      border-radius: 5px;
      border: none;
      background: #fff;
      font-size: 16px;
    }
    .error { color: red; font-size: 14px; margin-top: 5px; }
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
    .button:hover { background: #e09e00; }
    .success-message {
      margin-top: 20px;
      padding: 10px;
      background: green;
      color: white;
      text-align: center;
      border-radius: 5px;
    }
  `]
})
export class ContactFormComponent {
  formData = { name: '', email: '', message: '' };
  submitted = false;

  constructor(private contactService: ContactService) {}

  submitForm(form: NgForm) {
    if (form.valid) {
      this.contactService.sendMessage(this.formData).subscribe(() => {
        this.submitted = true;
        setTimeout(() => this.submitted = false, 5000);
        form.reset();
      });
    }
  }
}
