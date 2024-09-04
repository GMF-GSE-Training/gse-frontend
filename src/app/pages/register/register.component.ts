import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../component/button/blue-button/blue-button.component";
import { LoginRegisterComponent } from "../../component/login-register/login-register.component";
import { Router, RouterLink } from '@angular/router';
import { InputTextComponent } from "../../component/input/input-text/input-text.component";
import { UserService } from '../../shared/service/user.service';
import { RegisterUserRequest } from '../../shared/model/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BlueButtonComponent,
    LoginRegisterComponent,
    RouterLink,
    InputTextComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerUserRequest: RegisterUserRequest;
  registerError: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ){
    this.registerUserRequest = new RegisterUserRequest();
  }

  onRegister() {
    this.authService.register(this.registerUserRequest).subscribe({
      next: () => {
        this.registerError = false;
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.registerError = true;
        const e = error.error.errors
        if (error.error.code === 400) {
          if(e.nik || e.email || e.name || e.password) {
            if(e.email == 'Invalid email') {
              this.message = 'Alamat email tidak valid'
            } else {
              this.message = 'NIK, Email, Name, dan Password wajib diisi';
            }
          } else {
            this.message = e;
          }
        } else if (error.error.code === 401) {
          this.message = 'Informasi login tidak valid. Silakan periksa kembali email atau nomor pegawai dan password Anda';
        } else {
          this.message = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
        }
      },
    });
  }

}
