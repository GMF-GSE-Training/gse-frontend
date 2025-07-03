import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/service/auth.service';
import { Subscription } from 'rxjs';
import { SweetalertService } from '../../shared/service/sweetaler.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly sweetalertService: SweetalertService,
  ) { }

  @Input() isMenuVisible: boolean = false;
  @Output() menuClose = new EventEmitter<void>();

  private userProfileSubscription: Subscription | null = null;
  sidebarMenu: any[] = [];
  currentUserProfile: any = null;

  ngOnInit() {
    // Subscribe to user profile changes
    this.userProfileSubscription = this.authService.userProfile$.subscribe(
      (userProfile) => {
        this.currentUserProfile = userProfile;
        this.setMenuItems();
      }
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isMenuVisible']?.currentValue === true) {
      this.setMenuItems();
    }
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.userProfileSubscription) {
      this.userProfileSubscription.unsubscribe();
    }
  }

  private setMenuItems() {
    // Gunakan profil pengguna dari subscription, bukan localStorage
    const userProfile = this.currentUserProfile ||
      JSON.parse(localStorage.getItem('user_profile') || '{}');

    const role = userProfile?.role?.name;
    const id = userProfile?.id;
    const participantId = userProfile?.participant?.id;

    // Menu berdasarkan role (sama seperti sebelumnya)
    switch (role) {
      case 'user':
        this.sidebarMenu = [
          { name: 'Dashboard', routerLink: '/dashboard' },
          { name: 'Profile', routerLink: `/participants/${participantId}/profile/personal` },
          { name: 'Capability', routerLink: '/capability' },
          { name: 'My Class', routerLink: '/cot' },
          { name: 'Logout' },
        ];
        break;

      case 'lcu':
        this.sidebarMenu = [
          { name: 'Dashboard', routerLink: '/dashboard' },
          { name: 'Profile', routerLink: `/users/${id}/profile` },
          { name: 'Participants', routerLink: '/participants' },
          { name: 'Capability', routerLink: '/capability' },
          { name: 'COT', routerLink: '/cot' },
          { name: 'Logout' },
        ];
        break;

      case 'supervisor':
      case 'super admin':
        this.sidebarMenu = [
          { name: 'Dashboard', routerLink: '/dashboard' },
          { name: 'Profile', routerLink: `/users/${id}/profile` },
          { name: 'Participants', routerLink: '/participants' },
          { name: 'Capability', routerLink: '/capability' },
          { name: 'COT', routerLink: '/cot' },
          { name: 'User Role', routerLink: '/users' },
          // { name: 'E-Sign', routerLink: '/e-sign' }, // HIDDEN SEMENTARA
          { name: 'Logout' },
        ];
        break;

      default:
        this.sidebarMenu = [];
    }
  }

  closeMenu() {
    this.isMenuVisible = false;
    this.menuClose.emit();
  }

  onOverlayClick() {
    this.closeMenu();
  }

  onLogout() {
    this.closeMenu();
    this.logout();
  }

  private async logout() {
    const isConfirmed = await this.sweetalertService.confirm('Anda Yakin?', 'Apakah anda ingin keluar?', 'warning', 'Ya, keluar!');
    if(isConfirmed) {
      this.sweetalertService.loading('Mohon tunggu', 'Proses...');
      this.authService.logout().subscribe({
        next: () => {
          this.sweetalertService.close();
          localStorage.clear();
          this.authService.userProfile$.next(null);
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          this.sweetalertService.close();
          console.log('Logout failed', error);
        },
      });
    }
  }
}

