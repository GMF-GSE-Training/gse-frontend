import { Component } from '@angular/core';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';
import { LoginRegisterComponent } from "../../component/login-register/login-register.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginUserRequest } from '../../model/auth.model';
import { HttpClientModule } from '@angular/common/http';
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
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPassVisible: boolean = true;
  loginRequest: LoginUserRequest;
  loginError: boolean = false;
  message: string = '';

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
    this.authService.login(this.loginRequest).subscribe({
      next: () => {
        this.loginError = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error)
        this.loginError = true;
        if(error.status === 400) {
          this.message = 'Email atau Nomor Pegawai dan Password tidak boleh kosong';
        } else if(error.status === 401) {
          this.message = 'Informasi login tidak valid. Silakan periksa kembali email atau nomor pegawai dan password Anda'
        } else {
          this.message = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
        }
      }
    });
  }
}
