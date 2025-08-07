import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[appRoleAccess]'
})
export class RoleAccessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set appRoleAccess(roles: string[]) {
    const userHasRole = roles.some(role => this.authService.hasRole(role));
    
    if (userHasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!userHasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}