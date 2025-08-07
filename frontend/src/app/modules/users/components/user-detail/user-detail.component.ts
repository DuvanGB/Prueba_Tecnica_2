import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [
    CommonModule,   
    RouterModule,
  ],
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user!: User;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.loadUser(userId);
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el usuario');
        this.loading = false;
      }
    });
  }

  markAsFrequent(): void {
    this.userService.markAsFrequentCustomer(this.user.id).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.notification.showSuccess(
          `Usuario marcado como ${updatedUser.isFrequentCustomer ? 'frecuente' : 'no frecuente'}`
        );
      }
    });
  }

  getRoleName(role: string): string {
    return role.split('_')[1]; // Remueve el prefijo 'ROLE_'
  }
}