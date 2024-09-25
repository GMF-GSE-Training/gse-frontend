import { Component } from '@angular/core';
import { UserFormComponent } from "../../../layouts/user-form/user-form.component";
import { AuthService } from '../../../shared/service/auth.service';
import { SweetalertService } from '../../../shared/service/sweetaler.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [UserFormComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  data = {
    email: ''
  };
  message: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly sweetalertService: SweetalertService,
  ) { }

  onSubmit(data: { email: string }) {
    this.sweetalertService.alert(true, '', 'Bila email ada, maka email untuk mengubah password akan dikirim ke email yang Anda masukkan', 'success');
    this.authService.forgotPassword(data).subscribe();
  }
}
