import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="register-container">
      <h2>📝 Create Your Account</h2>
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <!-- Name -->
        <div class="form-group">
          <label>Name</label>
          <input type="text" formControlName="name" placeholder="Enter your name" />
        </div>

        <!-- Email -->
        <div class="form-group">
          <label>Email</label>
          <input type="email" formControlName="email" placeholder="Enter your email" />
        </div>

        <!-- Password -->
        <div class="form-group">
          <label>Password</label>
          <div class="password-wrapper">
            <input [type]="showPassword ? 'text' : 'password'" formControlName="password" placeholder="Create a password" />
            <button type="button" (click)="togglePassword()" class="toggle-btn">
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="form-group">
          <label>Confirm Password</label>
          <div class="password-wrapper">
            <input [type]="showConfirmPassword ? 'text' : 'password'" formControlName="confirmPassword" placeholder="Re-enter password" />
            <button type="button" (click)="toggleConfirmPassword()" class="toggle-btn">
              {{ showConfirmPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <button type="submit" [disabled]="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
        <p class="login-link">Already have an account? <a routerLink="/login">Login</a></p>
      </form>
    </div>
  `,
  styles: [`
    .register-container {
      max-width: 450px;
      margin: 60px auto;
      padding: 30px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      animation: fadeSlideIn 0.5s ease-in-out;
    }

    h2 {
      text-align: center;
      margin-bottom: 20px;
      font-weight: 600;
      color: #444;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      font-weight: 500;
      margin-bottom: 6px;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 15px;
      border-radius: 6px;
      border: 1px solid #ccc;
      transition: border-color 0.3s;
    }

    input:focus {
      border-color: #a4c639;
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
      width: 100%;
      background-color: #a4c639;
      color: white;
      font-weight: bold;
      padding: 12px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button[type="submit"]:hover {
      background-color: #8cbf2f;
    }

    .login-link {
      margin-top: 15px;
      text-align: center;
      font-size: 14px;
    }

    .login-link a {
      color: #007bff;
      text-decoration: none;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  passwordMatchValidator(form: AbstractControl): null | object {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fix the errors in the form.', 'Validation Error');
      return;
    }

    const { name, email, password } = this.registerForm.value;
    this.loading = true;

    this.authService.register({ name, email, password }).subscribe({
      next: () => {
        this.toastr.success('Account created successfully!', 'Welcome');
        this.router.navigate(['/login']);
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error(err.error?.msg || 'Registration failed.', 'Error');
        this.loading = false;
      }
    });
  }
}
