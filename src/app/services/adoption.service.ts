import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AdoptionRequest } from '../models/adoption-request.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = `${environment.apiUrl}/adoptions`;

  constructor(private http: HttpClient) {}

  /** ✨ Submit a new adoption request */
  submitAdoption(adoptionData: AdoptionRequest): Observable<any> {
    const payload: AdoptionRequest = {
      ...adoptionData,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.http.post(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  /** 📋 Get all adoption requests */
  getAllAdoptions(): Observable<AdoptionRequest[]> {
    return this.http.get<AdoptionRequest[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /** 🔍 Get a single adoption request by ID */
  getAdoptionById(id: string | number): Observable<AdoptionRequest> {
    return this.http.get<AdoptionRequest>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** ✏️ Update an adoption request (status, notes, etc.) */
  updateAdoption(id: string | number, updateData: Partial<AdoptionRequest>): Observable<any> {
    const payload = {
      ...updateData,
      updatedAt: new Date(),
    };

    return this.http.patch(`${this.apiUrl}/${id}`, payload).pipe(
      catchError(this.handleError)
    );
  }

  /** 🗑️ Delete an adoption request */
  deleteAdoption(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** 🚨 Centralized error handling */
  private handleError(error: any): Observable<never> {
    console.error('AdoptionService Error:', error);

    let message = 'Something went wrong.';

    if (error.error instanceof ErrorEvent) {
      message = `Client-side error: ${error.error.message}`;
    } else if (error.status) {
      message = `Server error ${error.status}: ${error.message}`;
    }

    return throwError(() => new Error(message));
  }
}
