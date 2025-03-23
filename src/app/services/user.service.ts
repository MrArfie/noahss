import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ✅ import environment
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`; // ✅ dynamic backend URL

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
