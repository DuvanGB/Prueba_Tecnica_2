import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserRole } from '../../models/user-role.enum';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  imports: [
    CommonModule,   
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId?: number;
  loading = false;
  availableRoles = Object.values(UserRole);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      roles: [[], [Validators.required]],
      isFrequentCustomer: [false]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.loadUser(this.userId);
      }
    });
  }

  loadUser(id: number): void {
    this.loading = true;
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.userForm.patchValue(user);
        this.loading = false;
      },
      error: (err) => {
        this.notification.showError('Error al cargar el usuario');
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.loading = true;
    const userData = this.userForm.value;

    const operation = this.isEditMode && this.userId
      ? this.userService.updateUser(this.userId, userData)
      : this.userService.createUser(userData);

    operation.subscribe({
      next: (user) => {
        this.notification.showSuccess(
          `Usuario ${this.isEditMode ? 'actualizado' : 'creado'} correctamente`
        );
        this.router.navigate(['/users', user.id]);
      },
      error: (err) => {
        this.notification.showError(
          `Error al ${this.isEditMode ? 'actualizar' : 'crear'} el usuario`
        );
        this.loading = false;
      }
    });
  }

  getRoleName(role: string): string {
    return role.split('_')[1]; // Remueve el prefijo 'ROLE_'
  }
}