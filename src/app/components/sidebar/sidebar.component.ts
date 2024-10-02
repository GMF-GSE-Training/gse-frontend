import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleBasedAccessDirective } from '../../shared/directive/role-based-access.directive';
import { AuthService } from '../../shared/service/auth.service';
import { ParticipantService } from '../../shared/service/participant.service';

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
  currentUserRole: string = localStorage.getItem('currentUserRole')!;
  id: string = '';

  generalMenu = [
    {
      name: 'Home',
      routerLink: ""
    },
    {
      name: this.currentUserRole?.toLocaleLowerCase() === 'user' ? 'Profil' : 'Participants Data',
      routerLink: this.currentUserRole?.toLocaleLowerCase() === 'user' ? `/participants/${this.id}/view` : "/participants"
    },
    {
      name: 'Capability',
      routerLink: "/capability"
    },
    {
      name: 'COT',
      routerLink: "/cot"
    },
  ];

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
      routerLink: "/curriculum-syllabus"
    },
  ];

  constructor(
    private authService: AuthService,
    private participantService: ParticipantService,
    private router: Router,
  ) {
    if(this.currentUserRole?.toLocaleLowerCase() === 'user') {
      this.participantService.getParticipantByNik().subscribe({
        next: (response) => {
          this.id = response.data;
          this.updateGeneralMenu();
        },
      });
    }
  }

  updateGeneralMenu() {
    this.generalMenu = [
      {
        name: 'Home',
        routerLink: ""
      },
      {
        name: 'Profil',
        routerLink: `/participants/${this.id}/view`
      },
      {
        name: 'Capability',
        routerLink: "/capability"
      },
      {
        name: 'COT',
        routerLink: "/cot"
      },
    ];
  }

  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  closeMenu() {
    this.isMenuVisible = false;
    this.menuClose.emit();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('currentUserRole');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log(error)
        alert(`${error.error.errors}`);
      }
    });
  }
}
