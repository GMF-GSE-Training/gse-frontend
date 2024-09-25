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
      this.isAuthRoute = this.router.url === '/login' ||
      this.router.url === '/register' ||
      this.router.url === '/users/add' ||
      this.router.url === '/reset-password' ||
      this.router.url === '/passwordreset' ||
      this.router.url.includes('/reset')  ||
      this.router.url.includes('/users') && this.router.url.includes('/edit');
    });
  }
}
