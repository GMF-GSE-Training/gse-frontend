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

    this.authService.me().subscribe(user => {
      this.currentUserRole = user.data.role.role;
      this.updateView();
    });
  }

  @Input() set appRoleBasedAccess(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.updateView(); // Update view jika role user sudah tersedia
  }

  private updateView(): void {
    console.log('Allowed Roles:', this.allowedRoles);
    console.log('Current User Role:', this.currentUserRole);

    if (this.allowedRoles.includes(this.currentUserRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
