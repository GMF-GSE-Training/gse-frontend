import { Component } from '@angular/core';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';
import { LoginRegisterComponent } from "../../component/login-register/login-register.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BlueButtonComponent,
    LoginRegisterComponent,
    CommonModule,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPassVisible: boolean = true;

  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }
}
