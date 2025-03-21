import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
@Component({
  selector: 'app-pet-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="pet-detail fade-in">
      <img [src]="pet?.image" alt="{{ pet?.name }}" class="pet-image">
      <h1>{{ pet?.name }}</h1>
      <h3>{{ pet?.breed }}</h3>
      <p><strong>Age:</strong> {{ pet?.age }} years</p>
      <p><strong>Description:</strong> {{ pet?.description }}</p>
      
      <div class="adoption-status">
        <span *ngIf="pet?.adopted" class="adopted">Already Adopted</span>
        <a *ngIf="!pet?.adopted" routerLink="/adoption-form" class="button">Adopt Me</a>
      </div>
    </div>
  `,
  styles: [`
    .pet-detail { text-align: center; padding: 50px; }
    .pet-image { width: 300px; height: 300px; object-fit: cover; border-radius: 10px; }
    .adopted { color: red; font-size: 18px; font-weight: bold; }
    .button { display: inline-block; padding: 12px 24px; background: #f8b400; color: white; border-radius: 5px; text-decoration: none; }
    .button:hover { background: #e09e00; }
  `]
})
export class PetDetailComponent implements OnInit {
  pet: Pet | undefined;

  constructor(private route: ActivatedRoute, private petService: PetService) {}

  ngOnInit() {
    const petId = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(petId).subscribe(pet => {
      this.pet = pet;
    });
  }
}
