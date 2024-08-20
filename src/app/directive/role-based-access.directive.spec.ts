import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { of } from 'rxjs';
import { RoleBasedAccessDirective } from './role-based-access.directive';

describe('RoleBasedAccessDirective', () => {
  let templateRef: TemplateRef<any>;
  let viewContainer: ViewContainerRef;
  let authService: AuthService;

  beforeEach(() => {
    templateRef = {} as TemplateRef<any>;
    viewContainer = {} as ViewContainerRef;
    authService = { me: () => of({ role: { role: ['user'] } }) } as any;
  });

  it('should create an instance', () => {
    const directive = new RoleBasedAccessDirective(templateRef, viewContainer, authService);
    expect(directive).toBeTruthy();
  });
});
