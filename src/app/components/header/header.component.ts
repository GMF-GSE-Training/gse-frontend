import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    SidebarComponent,
    CommonModule,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMenuVisible: boolean = false;
  shouldShowHeader = true;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  onMenuClose() {
    this.isMenuVisible = false;
  }

  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        const currentRoute = this.router.url;
        // Cek apakah URL saat ini ada dalam excludedRoutes atau cocok dengan excludedRoutesRegex
        this.shouldShowHeader = !(
          this.excludedRoutes.includes(currentRoute) ||
          this.excludedRoutesRegex.some(regex => regex.test(currentRoute))
        );
      });
  }

  private excludedRoutes: string[] = [
    '/login',
    '/register',
    '/password-reset',
    '/verification',
    '/users/add',
  ];

  private excludedRoutesRegex: RegExp[] = [
    /^\/users\/[a-f0-9\-]+\/edit(\?.*)?$/,
    /^\/users\/add(\?.*)?$/,
    /^\/reset\/[^/]+(\?.*)?$/,
    /^\/login(\?.*)?$/,
    /^\/register(\?.*)?$/,
    /^\/reset\/[^/]+$/,
    /^\/verification\/[^/]+$/,
  ];
}
