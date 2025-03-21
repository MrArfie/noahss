import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Donation } from '../models/donation.model'; // ✅ Ensure correct import path

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = 'https://your-api-url/donations'; // Replace with Firebase or backend API

  constructor(private http: HttpClient) {}

  processDonation(donationData: Donation): Observable<any> {
    return this.http.post(this.apiUrl, { 
      ...donationData, 
      createdAt: new Date() 
    });
  }

  getDonations(): Observable<Donation[]> {
    return this.http.get<Donation[]>(this.apiUrl);
  }

  getDonationById(id: number): Observable<Donation> {
    return this.http.get<Donation>(`${this.apiUrl}/${id}`);
  }
}
