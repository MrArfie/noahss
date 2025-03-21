import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private pets: Pet[] = [
    { id: 1, name: 'Buddy', breed: 'Golden Retriever', age: 2, image: 'assets/pets/dog1.jpg', category: 'dog', description: 'Friendly and energetic.', adopted: false },
    { id: 2, name: 'Mittens', breed: 'Persian Cat', age: 3, image: 'assets/pets/cat1.jpg', category: 'cat', description: 'Loves cuddles and naps.', adopted: true },
    { id: 3, name: 'Rocky', breed: 'German Shepherd', age: 4, image: 'assets/pets/dog2.jpg', category: 'dog', description: 'Loyal and protective.', adopted: false },
    { id: 4, name: 'Luna', breed: 'Siberian Husky', age: 1, image: 'assets/pets/dog3.jpg', category: 'dog', description: 'Playful and intelligent.', adopted: false },
    { id: 5, name: 'Whiskers', breed: 'Siamese Cat', age: 2, image: 'assets/pets/cat2.jpg', category: 'cat', description: 'Curious and talkative.', adopted: false }
  ];

  // Return all pets
  getPets(): Observable<Pet[]> {
    return of(this.pets);
  }

  // Return pet by ID
  getPetById(id: number): Observable<Pet | undefined> {
    return of(this.pets.find(pet => pet.id === id));
  }
}
