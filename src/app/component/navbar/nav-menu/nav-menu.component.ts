import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RoleBasedAccessDirective,
  ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.css'
})
export class NavMenuComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  closeMenu() {
    this.isMenuVisible = false;
    this.menuClose.emit();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log(error)
        alert(`${error.error.errors}`);
      }
    });
  }
}
