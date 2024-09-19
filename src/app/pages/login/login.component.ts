import { Component } from '@angular/core';
import { BlueButtonComponent } from '../../components/button/blue-button/blue-button.component';
import { LoginRegisterComponent } from "../../components/login-register/login-register.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginUserRequest } from '../../shared/model/auth.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../shared/service/auth.service';
import { TitleComponent } from "../../components/title/title.component";

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
    TitleComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPassVisible: boolean = true;
  loginRequest: LoginUserRequest = {
    identifier: '',
    password: '',
  };
  loginError: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  login() {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.loginError = false;
        this.router.navigateByUrl('/home');
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
