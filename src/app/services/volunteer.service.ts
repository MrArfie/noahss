import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VolunteerApplication } from '../models/volunteer.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private apiUrl = 'http://localhost:5000/api/volunteers'; // ✅ Adjust to your API

  constructor(private http: HttpClient) {}

  /** 📝 Submit Volunteer Application */
  submitVolunteerApplication(volunteerData: VolunteerApplication): Observable<any> {
    const payload = {
      ...volunteerData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'Pending'
    };
    return this.http.post(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  /** 📋 Get All Volunteer Applications (Admin View) */
  getVolunteerApplications(): Observable<VolunteerApplication[]> {
    return this.http.get<VolunteerApplication[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /** ✅ Update Volunteer Status */
  updateVolunteerStatus(
    id: string,
    status: 'Pending' | 'Approved' | 'Rejected',
    notes?: string
  ): Observable<any> {
    const updatePayload = {
      status,
      notes,
      updatedAt: new Date()
    };
    return this.http.patch(`${this.apiUrl}/${id}`, updatePayload).pipe(
      catchError(this.handleError)
    );
  }

  /** ❌ Delete Volunteer by ID */
  deleteVolunteer(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** ⚠️ Central Error Handler */
  private handleError(error: any): Observable<never> {
    console.error('VolunteerService Error:', error);
    const message = error.error instanceof ErrorEvent
      ? `Client Error: ${error.error.message}`
      : `Server Error ${error.status}: ${error.message}`;
    return throwError(() => new Error(message));
  }
}
