import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:5000/api/pets'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  /** 🐾 Get all pets */
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  /** 🐾 Get a single pet by ID */
  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  /** ➕ Add a new pet */
  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  /** ✏️ Update existing pet by ID */
  updatePet(id: string, updatedPet: Partial<Pet>): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, updatedPet);
  }

  /** 🗑️ Delete pet by ID */
  deletePet(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /** ✅ Mark pet as adopted */
  markAsAdopted(id: string): Observable<Pet> {
    return this.http.patch<Pet>(`${this.apiUrl}/${id}/adopt`, {});
  }
}
