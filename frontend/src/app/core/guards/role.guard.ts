import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'] as Array<string>;
    const userRoles = this.authService.getCurrentUserRoles();

    if (!expectedRoles || !userRoles) {
      this.router.navigate(['/']);
      return false;
    }

    const hasRole = expectedRoles.some(role => userRoles.includes(role));
    
    if (!hasRole) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}