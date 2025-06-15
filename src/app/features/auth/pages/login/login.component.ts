import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginUserRequest } from '../../../../shared/model/auth.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../shared/service/auth.service';
import { LoginFormComponent } from "../../components/login-form/login-form.component";
import { SweetalertService } from '../../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    LoginFormComponent
],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isPassVisible: boolean = false;
  loginRequest: LoginUserRequest = {
    identifier: '',
    password: '',
  };
  loginError: boolean = false;
  message: string = '';
  isLoading: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly sweetalertService: SweetalertService,
  ) { }

  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.loginRequest).subscribe({
      next: () => {
        this.authService.me().subscribe({
          next: (response) => {
            const userData = response.data;
            this.authService.setUserProfile(userData);
            localStorage.setItem('user_profile', JSON.stringify(userData));
            this.loginError = false;
            this.isLoading = false;
            
            // Cek verifikasi akun khusus role 'user'
            if (userData.role?.name === 'user' && !userData.verifiedAccount) {
              sessionStorage.setItem('unverified_shown', '1');
              this.sweetalertService.alert(
                'Peringatan', 
                'Email belum diverifikasi. Silakan verifikasi akun anda.', 
                'warning'
              ).then(() => this.router.navigateByUrl('/auth/verification'));
              return;
            }
            
            // Cek kelengkapan data untuk role 'user'
            if (userData.role?.name === 'user' && userData.participant) {
              const participant = userData.participant;
              // Cek apakah data participant lengkap
              const isDataComplete = participant && 
                participant.dateOfBirth && 
                participant.placeOfBirth && 
                participant.phoneNumber;
                
              if (!isDataComplete) {
                this.sweetalertService.alert(
                  'Peringatan', 
                  'Data anda belum lengkap, silahkan lengkapi data terlebih dahulu', 
                  'warning'
                );
                this.router.navigate(['/participants', participant.id, 'edit']);
                return;
              }
            }
            
            // Jika semua pengecekan berhasil, arahkan ke dashboard
            this.router.navigateByUrl('/dashboard');
          },
          error: (error) => {
            console.log(error);
            this.isLoading = false;
            this.loginError = true;
            this.message = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
          }
        });
      },
      error: (error) => {
        console.log(error)
        this.loginError = true;
        this.isLoading = false;
        if(error.status === 400) {
          this.message = 'Informasi login tidak valid. Silakan periksa kembali email atau nomor pegawai dan password Anda';
        } else if(error.status === 403) {
          sessionStorage.setItem('unverified_shown', '1');
          this.sweetalertService.alert(
            'Peringatan', 
            'Email belum diverifikasi. Silakan verifikasi akun Anda.', 
            'warning'
          ).then(() => this.router.navigateByUrl('/auth/verification'));
        } else {
          this.message = 'Terjadi kesalahan pada server. Silakan coba lagi nanti.';
        }
      }
    });
  }
}
