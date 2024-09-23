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
  ];

  currentUserRole: string = '';

  constructor(
    private authService: AuthService,
    private participantService: ParticipantService,
    private router: Router,
  ) {}

  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  ngOnInit(): void {
    this.authService.me().subscribe(response => {
      this.currentUserRole = response.data.role.role;
      console.log(response.data);

      if(this.currentUserRole.toLocaleLowerCase() === 'user') {
        this.generalMenu[1].name = 'Profil';
        this.participantService.getParticipantByNik().subscribe({
          next: (response) => {
            console.log(response);
            this.generalMenu[1].routerLink = `/participants/${response.data}/view`;
          },
          error: () => {
            this.generalMenu[1].routerLink = `/participants/add`;
          }
        });
      }
    });
  }

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
