import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,],
  template: `
    <div class="admin-login-container">
      <h2>🔐 Admin Login</h2>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email" placeholder="Admin email" required />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" formControlName="password" placeholder="Password" required />
        </div>

        <button type="submit" [disabled]="loading">
          {{ loading ? 'Logging in...' : 'Login as Admin' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .admin-login-container {
      max-width: 400px;
      margin: 80px auto;
      padding: 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #333;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      font-weight: 500;
      margin-bottom: 5px;
      display: block;
    }

    input {
      width: 100%;
      padding: 10px;
      font-size: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    input:focus {
      border-color: #7bbf1a;
      outline: none;
    }

    button {
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

    button:hover {
      background-color: #65a514;
    }
  `]
})
export class AdminLoginComponent {
  loginForm!: FormGroup;
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

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.toastr.error('Please enter valid admin credentials.', 'Validation Error');
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;

        if (res?.token && res?.user?.role === 'admin') {
          this.authService.saveSession(res);
          this.toastr.success('Admin login successful!', 'Welcome');
          this.router.navigate(['/admin']);
        } else {
          this.toastr.error('Access denied. Admins only.', 'Unauthorized');
        }
      },
      error: (err) => {
        this.loading = false;
        this.toastr.error(err.message || 'Login failed', 'Error');
      }
    });
  }
}
