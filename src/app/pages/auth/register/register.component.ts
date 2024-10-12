import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { AuthComponent } from "../../../components/auth/auth.component";
import { RouterLink } from '@angular/router';
import { RegisterUserRequest } from '../../../shared/model/auth.model';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/service/auth.service';
import { TitleComponent } from "../../../components/title/title.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { UserFormComponent } from '../../../layouts/user-form/user-form.component';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

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
    noPegawai: '',
    nik: '',
    email: '',
    name: '',
    password: '',
    dinas: '',
  };
  submitError: boolean = false;
  message: string = '';

  constructor(
    private authService: AuthService,
    private readonly sweetalertService: SweetalertService,
  ){ }

  onRegister(user: RegisterUserRequest) {
    this.cleanEmptyFields(user);
    this.sweetalertService.loading('Mohon tunggu', 'Proses...');
    console.log(user);

    this.authService.register(user).subscribe({
      next: (response) => {
        this.submitError = false;
        this.sweetalertService.close();
        this.message = 'Register berhasil, silahkan verifikasi email anda';
        console.log(response);
      },
      error: (error) => {
        console.log(error);
        this.submitError = true;
        this.sweetalertService.close();
        this.handleError(error);
      },
    });
  }

  private cleanEmptyFields(object: any): void {
    for (const key in object) {
      if (object.hasOwnProperty(key) && object[key] === '') {
        object[key] = undefined;  // Atau bisa diubah menjadi undefined
      }
    }
  }

  private handleError(error: any): void {
    const e = error.error.errors;
    const isObject = (obj: any) => obj !== null && typeof obj === 'object' && !Array.isArray(obj);
    const isArray = Array.isArray(e);

    if (isObject(e) || isArray) {
      if (e.message) {
        this.message = e.message;
      } else if (e.email || e.name || e.password || e.roleId || e.nik) {
        this.message = 'field dengan tanda bintang wajib diisi dengan benar';
      }
    } else {
      this.message = e;
    }
  }
}
