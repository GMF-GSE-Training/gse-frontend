import { Component } from '@angular/core';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';
import { LoginRegisterComponent } from "../../component/login-register/login-register.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginUserRequest } from '../../model/auth.model';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BlueButtonComponent,
    LoginRegisterComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPassVisible: boolean = true;
  private apiUrl = environment.apiUrl;
  private endpoint = environment.endpoints;
  loginRequest: LoginUserRequest;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginRequest = new LoginUserRequest();
  }

  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  login() {
    this.authService.login(this.loginRequest).subscribe((response: any) => {
      console.log(this.loginRequest)
      if(!response.ok) {
        alert('Login Berhasil');
        this.router.navigateByUrl('/home');
      } else {
        alert('Login Gagal')
      }
    });
  }
}
