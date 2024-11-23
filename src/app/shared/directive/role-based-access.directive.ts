import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appRoleBasedAccess]',
  standalone: true
})
export class RoleBasedAccessDirective {

  private currentUserRole: string = '';
  private allowedRoles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {
    this.loadRoleFromCache();
  }

  @Input() set appRoleBasedAccess(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.updateView();
  }

  // Load role from cache if available
  private loadRoleFromCache(): void {
    const cachedRole = sessionStorage.getItem('currentUserRole');
    if (cachedRole) {
      this.currentUserRole = cachedRole;
      this.updateView();
    } else {
      this.authService.me().subscribe(user => {
        if (user.data && typeof user.data !== 'string') {
          this.currentUserRole = user.data.role.name;
          sessionStorage.setItem('currentUserRole', this.currentUserRole); // Save to cache
          this.updateView();
        } else {
          // Handle case where data is a string or undefined
          console.error("Invalid data format:", user.data);
        }
      });

    }
  }

  private updateView(): void {
    if (this.allowedRoles.map(role => role.toLowerCase()).includes(this.currentUserRole.toLowerCase())) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
