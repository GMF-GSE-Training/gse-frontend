import { Component, OnInit } from '@angular/core';
import { EmailFormComponent } from "../../components/email-form/email-form.component";
import { AuthService } from '../../../../shared/service/auth.service';
import { SweetalertService } from '../../../../shared/service/sweetaler.service';
import { ErrorHandlerService } from '../../../../shared/service/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  standalone: true,
  imports: [EmailFormComponent],
  templateUrl: './verification.component.html',
  styleUrl: './verification.component.css'
})
export class VerificationComponent implements OnInit {
  data = {
    email: ''
  };
  message: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly sweetalertService: SweetalertService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit() {
    // Cek jika ada error di URL
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        const errorMessage = params['error'];
        // Tampilkan alert
        this.sweetalertService.alert('Gagal', errorMessage, 'error');
        // Navigasi hanya jika parameter ada
        if (errorMessage) {
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { error: null },
            queryParamsHandling: 'merge',
          });
        }
      }
    });

    // Cek jika ada email di sessionStorage (dari login redirect)
    const storedEmail = sessionStorage.getItem('unverified_email');
    if (storedEmail) {
      this.data.email = storedEmail;
      // Hapus dari sessionStorage setelah digunakan
      sessionStorage.removeItem('unverified_email');
    }
  }

  onSubmit(data: { email: string }) {
    this.sweetalertService.loading('Mohon tunggu', 'Proses...');
    this.authService.resendVerification(data.email).subscribe({
      next: () => {
        this.sweetalertService.close();
        this.sweetalertService.alert(
          'Berhasil', 
          'Bila email ada, maka email untuk verifikasi akun akan dikirim ke email yang Anda masukkan. Silakan periksa kotak masuk atau folder spam email Anda.', 
          'success'
        );
      },
      error: (error) => {
        this.sweetalertService.close();
        console.log(error);
        this.errorHandlerService.alertError(error);
      }
    });
  }
}