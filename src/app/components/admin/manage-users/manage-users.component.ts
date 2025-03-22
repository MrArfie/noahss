import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(20px)', opacity: 0 }),
        animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ],
  template: `
    <section class="manage-users" [@fadeInUp]>
      <h2>👥 Manage Users</h2>
      <input type="text" [(ngModel)]="searchQuery" placeholder="🔍 Search users..." (input)="filterUsers()" />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of filteredUsers">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <select [(ngModel)]="user.role" (change)="updateUserRole(user)">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
            <td>
              <button class="delete" (click)="deleteUser(user.id!)">🗑 Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  `,
  styles: [`
    .manage-users {
      padding: 30px;
      text-align: center;
    }

    h2 {
      font-size: 28px;
      margin-bottom: 20px;
      color: #444;
    }

    input {
      padding: 10px;
      width: 300px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    th, td {
      padding: 12px;
      border-bottom: 1px solid #eee;
    }

    select {
      padding: 6px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }

    button.delete {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s ease;
    }

    button.delete:hover {
      background-color: #d32f2f;
    }

    tr:hover {
      background-color: #f9f9f9;
    }

    @media (max-width: 768px) {
      table, th, td {
        font-size: 14px;
      }

      input {
        width: 100%;
      }
    }
  `]
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.filteredUsers = [...data];
    });
  }

  filterUsers(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query)
    );
  }

  updateUserRole(user: User): void {
    this.userService.updateUserRole(user).subscribe({
      next: () => console.log(`✅ Updated ${user.name} to ${user.role}`),
      error: (err) => console.error('❌ Failed to update role', err)
    });
  }

  deleteUser(userId: string): void {
    if (!userId) return;

    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.users = this.users.filter(user => user.id !== userId);
        this.filterUsers();
      });
    }
  }
}
