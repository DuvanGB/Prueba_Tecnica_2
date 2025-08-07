import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8090/api/clientes/consultar';

  constructor(private http: HttpClient) { }

  consultarCliente(tipoDocumento: string, numeroDocumento: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      tipoDocumento,
      numeroDocumento: numeroDocumento.replace(/\D/g, '')
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      switch(error.status) {
        case 400:
          errorMessage = error.error?.message || 'Datos inválidos';
          break;
        case 404:
          errorMessage = 'Cliente no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    console.error(`Error en consulta cliente:`, {
      status: error.status,
      message: error.message,
      url: error.url,
      timestamp: new Date().toISOString()
    });
    
    return throwError(() => new Error(errorMessage));
  }
}