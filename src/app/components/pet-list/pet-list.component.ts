import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';

@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="pet-detail-page">
      <div class="pet-container" *ngIf="pet" @fadeIn>
        
        <!-- Image Gallery -->
        <div class="gallery">
          <img [src]="selectedImage" class="main-image" @zoomEffect>
          <div class="thumbnail-container">
            <img *ngFor="let img of pet.images" [src]="img" (click)="changeImage(img)" class="thumbnail">
          </div>
        </div>

        <!-- Pet Information -->
        <div class="pet-info">
          <h1>{{ pet.name }}</h1>
          <p><strong>Breed:</strong> {{ pet.breed }}</p>
          <p><strong>Age:</strong> {{ pet.age }} years old</p>
          <p><strong>Description:</strong> {{ pet.description }}</p>
          
          <div class="adoption-status" *ngIf="pet.adopted">✅ Already Adopted</div>
          <a *ngIf="!pet.adopted" routerLink="/adoption-form" class="button">Adopt {{ pet.name }} ❤️</a>
        </div>
      </div>
    </section>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('zoomEffect', [
      transition(':enter', [
        animate('0.5s ease-in-out', keyframes([
          style({ transform: 'scale(0.8)', opacity: 0, offset: 0 }),
          style({ transform: 'scale(1.05)', opacity: 1, offset: 0.8 }),
          style({ transform: 'scale(1)', offset: 1 })
        ]))
      ])
    ])
  ],
  styles: [`
    .pet-detail-page {
      text-align: center;
      padding: 50px;
      max-width: 900px;
      margin: auto;
    }
    .pet-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 40px;
      align-items: center;
    }
    .gallery {
      max-width: 400px;
    }
    .main-image {
      width: 100%;
      border-radius: 10px;
      transition: transform 0.3s;
    }
    .main-image:hover {
      transform: scale(1.05);
    }
    .thumbnail-container {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .thumbnail {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      margin: 5px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .thumbnail:hover {
      transform: scale(1.1);
      border: 2px solid #a4c639;
    }
    .pet-info {
      max-width: 400px;
      text-align: left;
      background: rgba(255, 255, 255, 0.9);
      padding: 20px;
      border-radius: 10px;
    }
    .adoption-status {
      font-weight: bold;
      color: green;
      margin-top: 10px;
    }
    .button {
      display: inline-block;
      margin-top: 10px;
      padding: 12px 24px;
      background: #a4c639; /* Apple Green */
      color: white;
      font-weight: bold;
      border-radius: 5px;
      text-decoration: none;
      transition: 0.3s;
    }
    .button:hover {
      background: #8ebf20;
    }
  `]
})
export class PetDetailComponent implements OnInit {
  pet!: Pet;
  selectedImage!: string;

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit(): void {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(petId).subscribe(petData => {
      if (petData) {
        this.pet = petData;
        this.selectedImage = petData.image[0]; // Default image
      }
    });
  }

  changeImage(image: string): void {
    this.selectedImage = image;
  }
}
