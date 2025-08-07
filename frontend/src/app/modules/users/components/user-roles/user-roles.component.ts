import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserRole } from '../../models/user-role.enum';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule
  ],
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  @Input() user!: User;
  availableRoles = Object.values(UserRole);
  loading = false;

  constructor(
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {}

  toggleRole(role: UserRole): void {
    const currentRoles = [...this.user.roles];
    const roleIndex = currentRoles.indexOf(role);

    if (roleIndex === -1) {
      currentRoles.push(role);
    } else {
      currentRoles.splice(roleIndex, 1);
    }

    this.updateRoles(currentRoles);
  }

  updateRoles(roles: UserRole[]): void {
    if (roles.length === 0) {
      this.notification.showWarning('El usuario debe tener al menos un rol');
      return;
    }

    this.loading = true;
    this.userService.updateRoles(this.user.id, roles).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.notification.showSuccess('Roles actualizados correctamente');
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al actualizar roles');
        this.loading = false;
      }
    });
  }

  getRoleName(role: string): string {
    return role.split('_')[1]; // Remueve el prefijo 'ROLE_'
  }
}