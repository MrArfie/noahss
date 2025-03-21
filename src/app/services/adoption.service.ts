import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionRequest } from '../models/adoption.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {
  private apiUrl = 'https://your-api-url/adoptions'; // Replace with Firebase or backend API

  constructor(private http: HttpClient) {}

  submitAdoption(adoptionData: AdoptionRequest): Observable<any> {
    return this.http.post(this.apiUrl, adoptionData);
  }
}
