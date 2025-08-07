import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; 
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
  
    const loginData = {
      username: this.loginForm.value.username as string,
      password: this.loginForm.value.password as string
    };

    this.authService.login(loginData).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
        this.notification.showSuccess('Bienvenido de vuelta');
      },
      error: (err) => {
        this.notification.showError('Usuario o contraseña incorrectos');
        this.loading = false;
      }
    });
  }
}