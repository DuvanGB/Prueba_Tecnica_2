import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; 

interface AuthResponse {
  token: string;
  user: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {
    this.loadCurrentUser();
  }

  private loadCurrentUser(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        this.storeAuthData(response);
      })
    );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData);
  }

  private storeAuthData(response: AuthResponse): void {
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getCurrentUserRoles(): string[] {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.roles || [];
  }

  isAdmin(): boolean {
    return this.getCurrentUserRoles().includes('ROLE_ADMIN');
  }

  hasRole(requiredRole: string): boolean {
    const token = this.getToken();
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userRoles: string[] = decodedToken.roles || [];
      return userRoles.includes(requiredRole);
    }

    const user = this.currentUserSubject.value;
    if (user && user.roles) {
      return user.roles.includes(requiredRole);
    }

    return false;
  }
}