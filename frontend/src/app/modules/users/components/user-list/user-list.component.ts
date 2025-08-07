import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserRole } from '../../models/user-role.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; 

@Component({
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  UserRole = UserRole;
  users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchTerm = '';
  roleFilter = '';

  constructor(
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar usuarios');
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = !this.roleFilter || user.roles.includes(this.roleFilter as UserRole);
      return matchesSearch && matchesRole;
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== id);
          this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
          this.notification.showSuccess('Usuario eliminado correctamente');
        }
      });
    }
  }

  enumKeys(obj: any): string[] {
    return Object.keys(obj).filter(key => isNaN(Number(key)));
  }

  getRoleName(role: string): string {
    return role.split('_')[1]; // Remueve el prefijo 'ROLE_'
  }
}