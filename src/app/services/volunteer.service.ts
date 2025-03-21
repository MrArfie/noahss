import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { VolunteerApplication } from '../models/volunteer.model';

@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private apiUrl = 'https://your-api-url/volunteers'; // Replace with your backend API

  constructor(private http: HttpClient) {}

  /**
   * Submit a new volunteer application
   * @param volunteerData - The volunteer application details
   * @returns Observable<any> - Response from the backend
   */
  submitVolunteerApplication(volunteerData: VolunteerApplication): Observable<any> {
    return this.http.post(this.apiUrl, { 
      ...volunteerData, 
      createdAt: new Date(), 
      updatedAt: new Date() 
    }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve all volunteer applications
   * @returns Observable<VolunteerApplication[]> - List of applications from the backend
   */
  getVolunteerApplications(): Observable<VolunteerApplication[]> {
    return this.http.get<VolunteerApplication[]>(this.apiUrl).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieve a single volunteer application by ID
   * @param id - Volunteer application ID
   * @returns Observable<VolunteerApplication> - The volunteer application details
   */
  getVolunteerApplicationById(id: number): Observable<VolunteerApplication> {
    return this.http.get<VolunteerApplication>(`${this.apiUrl}/${id}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Update the status and notes of a volunteer application
   * @param id - Volunteer application ID
   * @param status - New status (Pending, Approved, Rejected)
   * @param notes - Admin notes
   * @returns Observable<any> - Response from the backend
   */
  updateVolunteerStatus(id: number, status: 'Pending' | 'Approved' | 'Rejected', notes?: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { status, notes, updatedAt: new Date() }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Delete a volunteer application
   * @param id - Volunteer application ID
   * @returns Observable<any> - Response from the backend
   */
  deleteVolunteerApplication(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  /**
   * Handle API Errors
   * @param error - The error response
   * @returns Observable<never> - Throws an error message
   */
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
