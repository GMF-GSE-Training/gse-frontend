import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SearchComponent,
    NavMenuComponent,
    CommonModule,
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMenuVisible: boolean = false;
  shouldShowNavbar = true;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }


  ngOnInit() {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.shouldShowNavbar = !(currentRoute === '/' || currentRoute === '/register');
    });
  }
}
