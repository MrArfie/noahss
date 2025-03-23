import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Donation } from '../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = `${environment.apiUrl}/donations`;

  constructor(private http: HttpClient) {}

  /** 💰 Process a new donation */
  processDonation(donationData: Donation): Observable<any> {
    const payload = {
      ...donationData,
      createdAt: new Date()
    };
    return this.http.post(this.apiUrl, payload).pipe(
      catchError(this.handleError)
    );
  }

  /** 📋 Get all donations */
  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  /** 🔍 Get a single donation by ID */
  getDonationById(id: string): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /** ⚠️ Error handler */
  private handleError(error: any): Observable<never> {
    console.error('DonationService Error:', error);
    const message = error?.error?.msg || 'Something went wrong with donation service.';
    return throwError(() => new Error(message));
  }
}
