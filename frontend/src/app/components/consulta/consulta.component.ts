import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consulta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private clienteService = inject(ClienteService);

  consultaForm = this.fb.group({
    tipoDocumento: ['', Validators.required],
    numeroDocumento: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(11),
      Validators.pattern('^[0-9,]*$')
    ]]
  });

  tiposDocumento = [
    { value: 'C', label: 'Cédula de ciudadanía' },
    { value: 'P', label: 'Pasaporte' }
  ];

  errorMessage: string | null = null;
  isLoading = false;

  consultarCliente(): void {
    if (this.consultaForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;

      const { tipoDocumento, numeroDocumento } = this.consultaForm.value;
      const numDocLimpio = numeroDocumento?.replace(/\D/g, '') || '';

      this.clienteService.consultarCliente(tipoDocumento || '', numDocLimpio).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.router.navigate(['/resumen'], { state: { cliente: response } });
        },
        error: (err) => {
          this.isLoading = false;
          this.showError(err.message);
          
          // Solo para debug 
          console.group('Detalles del Error');
          console.error('Error completo:', err);
          console.groupEnd();
        }
      });
    }
  }

  private showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
  }

  formatNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    this.consultaForm.patchValue({ numeroDocumento: value }, { emitEvent: false });
  }
}