import { Component } from '@angular/core';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';
import { AuthComponent } from "../../../components/auth/auth.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { LoginUserRequest } from '../../../shared/model/auth.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/service/auth.service';
import { TitleComponent } from "../../../components/title/title.component";
import { TogglePasswordVisibilityComponent } from '../../../components/toggle-password-visibility/toggle-password-visibility.component';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BlueButtonComponent,
    AuthComponent,
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterLink,
    TitleComponent,
    TogglePasswordVisibilityComponent,
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isPassVisible: boolean = false;
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
        const responseData = response.data as User;
        // Set expiration time saat login berhasil
        const expirationTime = new Date().getTime() + (60 * 60 * 1000); // 30 menit
        sessionStorage.setItem('tokenExpiration', expirationTime.toString());
        sessionStorage.setItem('currentUserRole', responseData.role.name);
        sessionStorage.setItem('participantId', responseData.participantId ?? '');
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
