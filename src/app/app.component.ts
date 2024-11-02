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
      const url = this.router.url;
      this.isAuthRoute =
        url === '/login' ||
        url === '/register' ||
        url === '/users/add' ||
        url === '/reset-password' ||
        url === '/passwordreset' ||
        url.includes('/reset') ||
        (url.includes('/users') && url.includes('/edit')) ||
        url === '/not-found'; // Pengecekan untuk rute yang tidak dikenali
    });
  }
}
