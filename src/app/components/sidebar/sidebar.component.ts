import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class SidebarComponent implements OnChanges {
  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  generalMenu = [
    {
      name: 'Home',
      routerLink: ""
    },
    {
      name: 'Profil',
      routerLink: `/users/${this.getUserProfile().id}/profil`
    },
    {
      name: 'Participants',
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
  ];

  generalUserMenu = [
    {
      name: 'Home',
      routerLink: ""
    },
    {
      name: 'Profile',
      routerLink: `/participants/${this.getUserProfile().participant?.id}/profile/personal`
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
      name: 'User Role',
      routerLink: "/users"
    },
    {
      name: 'E-Sign',
      routerLink: "/e-sign"
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isMenuVisible']?.currentValue === true) {
      const userProfile = this.getUserProfile();
      const { id, participant } = userProfile;

      this.generalMenu = id
        ? [
            { name: 'Home', routerLink: '' },
            { name: 'Profile', routerLink: `/users/${id}/profile` },
            { name: 'Participants', routerLink: '/participants' },
            { name: 'Capability', routerLink: '/capability' },
            { name: 'COT', routerLink: '/cot' },
          ]
        : [];

      this.generalUserMenu = participant?.id
        ? [
            { name: 'Home', routerLink: '' },
            { name: 'Profile', routerLink: `/participants/${participant.id}/profile/personal` },
            { name: 'Capability', routerLink: '/capability' },
            { name: 'COT', routerLink: '/cot' },
          ]
        : [];
    }
  }

  closeMenu() {
    this.isMenuVisible = false;
    this.menuClose.emit();
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.authService.userProfile$.next(null);
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.error('Logout failed', error);
        this.router.navigateByUrl('/login');
      },
    });
  }

  private getUserProfile(): { id?: string; participant?: { id: string } } {
    try {
      return JSON.parse(localStorage.getItem('user_profile') || '{}');
    } catch (error) {
      console.error('Error parsing user_profile from localStorage', error);
      return {};
    }
  }
}
