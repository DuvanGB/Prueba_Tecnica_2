import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ignorar URLs absolutas
    if (!request.url.startsWith('http') && !request.url.startsWith('assets/')) {
      request = request.clone({
        url: environment.apiUrl + '/' + request.url
      });
    }

    return next.handle(request);
  }
}