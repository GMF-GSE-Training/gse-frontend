import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    SearchComponent,
    NavMenuComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuVisible: boolean = false;

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
