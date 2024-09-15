import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleBasedAccessDirective } from '../../shared/directive/role-based-access.directive';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    RoleBasedAccessDirective,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  generalMenu = [
    {
      name: 'Home',
      routerLink: ""
    },
    {
      name: 'Participants Data',
      routerLink: "/participants"
    },
    {
      name: 'Capability',
      routerLink: "/capability"
    },
    {
      name: 'COT',
      routerLink: "/cot"
    },
  ]

  optionalMenu = [
    {
      name: 'Users',
      routerLink: "/users"
    },
    {
      name: 'E-Sign',
      routerLink: "/sign"
    },
    {
      name: 'Curriculum & Syllabus',
      routerLink: "/curriculum"
    },
  ]

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
