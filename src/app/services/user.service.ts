import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // ✅ Replace with your actual API endpoint
  private apiUrl = 'http://localhost:5000/api/users';

  constructor(private http: HttpClient) {}

  /** 📋 Get All Users */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  /** ✏️ Update User Role (e.g., make admin) */
  updateUserRole(user: User): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${user._id}`, { role: user.role });
  }

  /** 🗑️ Delete a User */
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
