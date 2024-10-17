import { Component } from '@angular/core';
import { ResetPassword } from '../../../shared/model/auth.model';
import { AuthService } from '../../../shared/service/auth.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordFormComponent } from "../../../layouts/reset-password-form/reset-password-form.component";

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ResetPasswordFormComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  data = {
    token: this.route.snapshot.paramMap.get('token') || '',
    newPassword: '',
    confirmNewPassword: '',
  }

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly sweetalertService: SweetalertService,
  ) { }

  onResetPassword(newPassword: ResetPassword) {
    console.log(newPassword)
    this.authService.resetPassword(newPassword).subscribe({
      next: () => {
        this.sweetalertService.alert(true, 'Berhasil!', 'Password berhasil diperbarui', 'success');
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        console.log(error)
        const e = error.error.errors;
        this.sweetalertService.alert(true, 'Gagal!', e, 'error');
      }
    })
  }
}
