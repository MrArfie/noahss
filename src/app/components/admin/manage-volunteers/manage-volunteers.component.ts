import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { VolunteerApplication } from '../../../models/volunteer.model';
import { VolunteerService } from '../../../services/volunteer.service';

@Component({
  selector: 'app-manage-volunteers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="manage-volunteers fade-in">
      <h2>🤝 Manage Volunteer Applications</h2>

      <!-- Search -->
      <input type="text" placeholder="🔍 Search by name/email..." [(ngModel)]="searchQuery" (input)="filterVolunteers()" />

      <!-- Volunteer List -->
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Availability</th>
            <th>Skills</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let v of filteredVolunteers">
            <td>{{ v.name }}</td>
            <td>{{ v.email }}</td>
            <td>{{ v.phone }}</td>
            <td>{{ v.availability }}</td>
            <td>{{ v.skills }}</td>
            <td><span [ngClass]="v.status">{{ v.status }}</span></td>
            <td><input [(ngModel)]="v.notes" placeholder="Admin notes" /></td>
            <td>
              <button class="approve" (click)="updateStatus(v, 'Approved')">✔</button>
              <button class="reject" (click)="updateStatus(v, 'Rejected')">✘</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .manage-volunteers {
      padding: 30px;
      text-align: center;
    }
    input[type="text"] {
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 6px;
      width: 300px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    input {
      padding: 6px;
      width: 100%;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button {
      border: none;
      padding: 6px 12px;
      margin: 2px;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
    }
    .approve {
      background-color: #4caf50;
      color: white;
    }
    .reject {
      background-color: #f44336;
      color: white;
    }
    .Approved {
      color: green;
      font-weight: bold;
    }
    .Pending {
      color: orange;
      font-weight: bold;
    }
    .Rejected {
      color: red;
      font-weight: bold;
    }
  `]
})
export class ManageVolunteersComponent implements OnInit {
  volunteers: VolunteerApplication[] = [];
  filteredVolunteers: VolunteerApplication[] = [];
  searchQuery: string = '';

  constructor(private volunteerService: VolunteerService) {}

  ngOnInit(): void {
    this.loadVolunteers();
  }

  loadVolunteers(): void {
    this.volunteerService.getVolunteerApplications().subscribe(data => {
      this.volunteers = data;
      this.filteredVolunteers = data;
    });
  }

  filterVolunteers(): void {
    this.filteredVolunteers = this.volunteers.filter(v =>
      v.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      v.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  updateStatus(volunteer: VolunteerApplication, status: 'Approved' | 'Rejected') {
    this.volunteerService.updateVolunteerStatus(volunteer.id!, status, volunteer.notes).subscribe(() => {
      volunteer.status = status;
    });
  }
}
