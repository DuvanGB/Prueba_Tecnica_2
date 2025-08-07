import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error';
        
        if (error.error instanceof ErrorEvent) {
          // Error del lado cliente
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Error del lado servidor
          switch (error.status) {
            case 400:
              errorMessage = error.error.message || 'Solicitud incorrecta';
              break;
            case 401:
              errorMessage = 'Sesión expirada, por favor ingresa nuevamente';
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'No tienes permisos para esta acción';
              this.router.navigate(['/']);
              break;
            case 404:
              errorMessage = 'Recurso no encontrado';
              break;
            case 500:
              errorMessage = 'Error interno del servidor';
              break;
          }
        }

        if (error.status !== 401) { // Evitar mostrar mensaje duplicado en login
          this.toastr.error(errorMessage, 'Error');
        }

        return throwError(() => error);
      })
    );
  }
}