import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

// 👤 Interfaces
export interface User {
  name: string;
  email: string;
  role: 'admin' | 'user' | string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  private authStatusSubject = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserSubject = new BehaviorSubject<User | null>(this.getStoredUser());

  // Expose observables to components
  authStatus$ = this.authStatusSubject.asObservable();
  user$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  /** 📝 Register a new user */
  register(user: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, user).pipe(
      tap(res => this.saveSession(res)),
      catchError(this.handleError)
    );
  }

  /** 🔐 Login */
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(res => this.saveSession(res)),
      catchError(this.handleError)
    );
  }

  /** 💾 Save token & user to localStorage and update observables */
  public saveSession(response: AuthResponse): void {
    localStorage.setItem('auth-token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.authStatusSubject.next(true);
    this.currentUserSubject.next(response.user);
  }

  /** 🔍 Get the stored token */
  getToken(): string | null {
    return localStorage.getItem('auth-token');
  }

  /** 🔍 Get current user object */
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** 🔍 Get current user role */
  getUserRole(): string | null {
    return this.getUser()?.role || null;
  }

  /** 🔒 Check if token exists */
  hasToken(): boolean {
    return !!localStorage.getItem('auth-token');
  }

  /** 🔐 Used by guards or app logic */
  isAuthenticated(): boolean {
    return this.hasToken();
  }

  /** 🚪 Logout and clear session */
  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    this.authStatusSubject.next(false);
    this.currentUserSubject.next(null);
  }

  /** 👤 Internal: Get user from localStorage on initial load */
  private getStoredUser(): User | null {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  }

  /** ❗ Global error handler */
  private handleError(error: any): Observable<never> {
    let message = 'Something went wrong. Please try again.';
    if (error.error?.msg) {
      message = error.error.msg;
    } else if (Array.isArray(error.error?.errors)) {
      message = error.error.errors.map((e: any) => e.msg).join(', ');
    }
    return throwError(() => new Error(message));
  }
}
