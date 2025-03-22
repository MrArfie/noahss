import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('slideFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ],
  template: `
    <div class="login-container" [@slideFadeIn]>
      <h2>🔐 Login to Your Account</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" placeholder="Enter your email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-wrapper">
            <input
              id="password"
              [type]="showPassword ? 'text' : 'password'"
              formControlName="password"
              placeholder="Enter your password"
              required
            />
            <button type="button" class="toggle-btn" (click)="togglePasswordVisibility()" aria-label="Toggle Password">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <button type="submit" [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <div class="admin-link">
        <span>Are you an admin?</span>
        <a (click)="goToAdminLogin()">Login here</a>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 420px;
      margin: 80px auto;
      padding: 35px 25px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.5s ease-in-out;
    }

    h2 {
      text-align: center;
      margin-bottom: 25px;
      font-weight: 600;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
      text-align: left;
    }

    label {
      display: block;
      margin-bottom: 6px;
      font-weight: 500;
      color: #444;
    }

    input {
      width: 100%;
      padding: 11px;
      font-size: 15px;
      border-radius: 6px;
      border: 1px solid #ccc;
      transition: border 0.2s ease-in-out;
    }

    input:focus {
      border-color: #7bbf1a;
      outline: none;
    }

    .password-wrapper {
      display: flex;
      align-items: center;
    }

    .toggle-btn {
      margin-left: 8px;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
    }

    button[type="submit"] {
      background-color: #7bbf1a;
      color: white;
      font-weight: bold;
      padding: 12px;
      width: 100%;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.3s;
    }

    button[type="submit"]:hover {
      background-color: #65a514;
    }

    .admin-link {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
    }

    .admin-link span {
      color: #666;
    }

    .admin-link a {
      margin-left: 5px;
      cursor: pointer;
      color: #7bbf1a;
      font-weight: 500;
      text-decoration: underline;
    }

    .admin-link a:hover {
      color: #65a514;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class LoginComponent {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter valid credentials.', 'Validation Error');
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;

        if (res?.token && res?.user?.role) {
          this.authService.saveSession(res);
          this.toastr.success('Login successful!', 'Welcome');
          this.router.navigate(['/']);
        } else {
          this.toastr.error('Login failed. Invalid server response.', 'Error');
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.message || 'Login failed', 'Error');
      }
    });
  }

  goToAdminLogin(): void {
    this.router.navigate(['/admin-login']);
  }
}
