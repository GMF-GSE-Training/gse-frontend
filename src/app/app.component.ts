import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GMF Aeroasia';
  isAuthRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.isAuthRoute =
        currentRoute.includes('/login') ||
        currentRoute.includes('/register') ||
        currentRoute.includes('/password-reset') ||
        currentRoute.includes('/verification') ||
        currentRoute.includes('/reset') ||
        (currentRoute.includes('/users') && currentRoute.includes('/edit')) ||
        (currentRoute.includes('/users') && currentRoute.includes('/add'))
    });
  }
}
