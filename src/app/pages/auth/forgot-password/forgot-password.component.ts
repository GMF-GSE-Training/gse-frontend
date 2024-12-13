import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { EmailFormComponent } from "../../../contents/email-form/email-form.component";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [EmailFormComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly sweetalertService: SweetalertService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {}

  data = {
    email: ''
  };
  errorMessage: string = '';

  ngOnInit(): void {
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
  }

  onSubmit(data: { email: string }) {
    this.sweetalertService.loading('Mohon tunggu', 'Proses...');
    this.authService.forgotPassword(data).subscribe({
      next: () => {
        this.sweetalertService.alert('', 'Bila email ada, maka email untuk mengubah password akan dikirim ke email yang Anda masukkan', 'success');
      },
      error: (error) => {
        this.sweetalertService.alert('Gagal!', 'Terjadi kesalahan, silakan coba lagi nanti.', 'error');
        console.log(error);
      }
    });
  }
}
