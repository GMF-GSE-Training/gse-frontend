import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { AuthComponent } from "../../components/auth/auth.component";
import { Router, RouterLink } from '@angular/router';
import { RegisterUserRequest } from '../../shared/model/user.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/service/auth.service';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from '../../components/input/base-input/base-input.component';
import { UserFormComponent } from '../../layouts/user-form/user-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    BlueButtonComponent,
    AuthComponent,
    RouterLink,
    BaseInputComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
    TitleComponent,
    UserFormComponent,
],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerUserRequest: RegisterUserRequest = {
    no_pegawai: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    dinas: '',
  };
  registerError: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
  ){ }

  onRegister(user: RegisterUserRequest) {
    user = this.registerUserRequest;
    this.authService.register(this.registerUserRequest).subscribe({
      next: () => {
        this.registerError = false;
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.log(error);
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

  private cleanEmptyFields(object: any): void {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === '') {
        object[key] = null;  // Atau bisa diubah menjadi undefined
      }
    }
  }
}
