import { Component } from '@angular/core';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";
import { ResetPassword } from '../../../shared/model/auth.model';
import { AuthService } from '../../../shared/service/auth.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  user = {
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
