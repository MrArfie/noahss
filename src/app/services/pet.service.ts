import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // 👈 import environment
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = `${environment.apiUrl}/pets`; // ✅ dynamic base URL

  constructor(private http: HttpClient) {}

  /** 🐾 Fetch all pets */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  /** 🔍 Get a specific pet by ID */
  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  /** ➕ Add a new pet */
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  /** ✏️ Update an existing pet */
  updatePet(id: string, updatedPet: Partial<Pet>): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, updatedPet);
  }

  /** 🗑️ Delete a pet */
  deletePet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** ✅ Mark a pet as adopted */
  markAsAdopted(id: string): Observable<Pet> {
    return this.http.patch<Pet>(`${this.apiUrl}/${id}/adopt`, {});
  }

  /** 🌟 Optional: Get only available (not adopted) pets */
  getAvailablePets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}?adopted=false`);
  }

  /** 🌟 Optional: Get featured pets (if backend supports it) */
  getFeaturedPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/featured`);
  }
}
