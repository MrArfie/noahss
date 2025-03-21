import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Import FormsModule for the form
  template: `
    <section class="contact-page" @fadeIn>
      <h1>📞 Get in Touch with Noah's Ark Shelter</h1>
      <p>We’d love to hear from you! Fill out the form below or reach out through our contact details.</p>

      <div class="contact-container">
        <!-- Contact Form -->
        <div class="contact-form">
          <h2>Send Us a Message</h2>
          <form (submit)="sendMessage()">
            <input type="text" placeholder="Your Name" [(ngModel)]="formData.name" required>
            <input type="email" placeholder="Your Email" [(ngModel)]="formData.email" required>
            <textarea placeholder="Your Message" [(ngModel)]="formData.message" required></textarea>
            <button type="submit" class="button">Send Message</button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="contact-info">
          <h2>📍 Contact Details</h2>
          <p><strong>📍 Address:</strong> 123 Animal Shelter Road, Pampanga</p>
          <p><strong>📞 Phone:</strong> <a href="tel:+639171234567">0917-123-4567</a></p>
          <p><strong>📧 Email:</strong> <a href="mailto:info&#64;noahsark.org">info&#64;noahsark.org</a></p>

          <p><strong>⏰ Hours:</strong> Mon - Sat | 9:00 AM - 6:00 PM</p>
        </div>
      </div>
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
    .contact-page {
      text-align: center;
      padding: 50px;
      max-width: 900px;
      margin: auto;
    }
    .contact-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      margin-top: 30px;
    }
    .contact-form, .contact-info {
      background: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      width: 350px;
      transition: transform 0.3s;
    }
    .contact-form:hover, .contact-info:hover {
      transform: scale(1.05);
      background: #f0f8ea;
    }
    .contact-form h2, .contact-info h2 {
      color: #2e7d32; /* Apple Green Shade */
    }
    input, textarea {
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
    .contact-info p {
      font-size: 16px;
      margin: 5px 0;
    }
    .contact-info a {
      color: #2e7d32;
      text-decoration: none;
      font-weight: bold;
    }
    .contact-info a:hover {
      text-decoration: underline;
    }
  `]
})
export class ContactComponent {
  formData = { name: '', email: '', message: '' };

  sendMessage() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      alert(`Message sent successfully! 📩\n\nName: ${this.formData.name}\nEmail: ${this.formData.email}`);
      this.formData = { name: '', email: '', message: '' }; // Reset form
    } else {
      alert('⚠️ Please fill out all fields before sending.');
    }
  }
}
