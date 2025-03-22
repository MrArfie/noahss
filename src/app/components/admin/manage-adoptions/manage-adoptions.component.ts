import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdoptionRequest } from '../../../models/adoption-request.model';
import { AdoptionService } from '../../../services/adoption.service';

@Component({
  selector: 'app-manage-adoptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="manage-adoptions">
      <h2>📋 Manage Adoptions</h2>

      <div class="adoption-list" *ngIf="adoptions.length > 0; else noData">
        <table>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Pet</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let adoption of adoptions">
              <td>{{ adoption.applicant?.name || 'Unknown' }}</td>
              <td>{{ adoption.pet?.name || 'Unknown' }}</td>
              <td>
                <span class="status" [ngClass]="getStatusClass(adoption.status)">
                  {{ adoption.status || 'Pending' }}
                </span>
              </td>
              <td>
                <button *ngIf="adoption.status === 'Pending'" class="approve"
                        (click)="approveAdoption(adoption.id ?? '')">
                  ✅ Approve
                </button>
                <button *ngIf="adoption.status === 'Pending'" class="reject"
                        (click)="rejectAdoption(adoption.id ?? '')">
                  ❌ Reject
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ng-template #noData>
        <p class="no-data">No adoption requests found.</p>
      </ng-template>
    </div>
  `,
  styles: [/* keep your existing styles */]
})
export class ManageAdoptionsComponent implements OnInit {
  adoptions: AdoptionRequest[] = [];

  constructor(
    private adoptionService: AdoptionService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadAdoptions();
  }

  loadAdoptions(): void {
    this.adoptionService.getAllAdoptions().subscribe({
      next: (data) => {
        this.adoptions = data.map(adoption => this.normalizeAdoption(adoption));
      },
      error: () => this.toastr.error('Failed to fetch adoptions.', 'Error')
    });
  }

  approveAdoption(id: string | number): void {
    this.adoptionService.updateAdoption(id, { status: 'Approved' }).subscribe({
      next: () => {
        this.toastr.success('Adoption approved!');
        this.loadAdoptions();
      },
      error: () => this.toastr.error('Failed to approve adoption.', 'Error')
    });
  }

  rejectAdoption(id: string | number): void {
    this.adoptionService.updateAdoption(id, { status: 'Rejected' }).subscribe({
      next: () => {
        this.toastr.warning('Adoption rejected.');
        this.loadAdoptions();
      },
      error: () => this.toastr.error('Failed to reject adoption.', 'Error')
    });
  }

  getStatusClass(status: string | undefined): string {
    return status || 'Pending';
  }

  private normalizeAdoption(adoption: any): AdoptionRequest {
    return {
      id: adoption.id ?? '',
      name: adoption.name ?? '',
      email: adoption.email ?? '',
      phone: adoption.phone ?? '',
      reason: adoption.reason ?? '',
      petId: adoption.petId ?? '',
      status: adoption.status ?? 'Pending',
      createdAt: adoption.createdAt ? new Date(adoption.createdAt) : undefined,
      updatedAt: adoption.updatedAt ? new Date(adoption.updatedAt) : undefined,
      applicant: adoption.applicant ?? { name: 'Unknown' },
      pet: adoption.pet ?? { name: 'Unknown' }
    };
  }
}
