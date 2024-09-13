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
  isLoginRegisterRoute: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isLoginRegisterRoute = this.router.url.includes('/login') || this.router.url.includes('/register');
    });
  }
}
