import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AuthComponent } from "../../components/auth/auth.component";
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from '../../components/input/base-input/base-input.component';
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [
    AuthComponent,
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    CommonModule,
    RouterLink,
],
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css', '../user-form/user-form.component.css']
})
export class ResetPasswordFormComponent {
  @Input() data: { newPassword: string, confirmNewPassword: string } = {
    newPassword: '',
    confirmNewPassword: '',
  };
  @Input() submitError: boolean = false;
  isSubmitted: boolean = false;
  @Input() parrentMessage: string = '';
  message: string = '';

  isPassVisible: boolean = false;
  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.formSubmit.emit(this.data);
    } else {
      this.message = this.getMessage();  // Menampilkan pesan error di parent jika form tidak valid
    }
  }

  getMessage() {
    if (!this.form) return '';

    // Reset Password
    const newPasswordControl = this.form.controls['newPassword'];
    if (newPasswordControl?.invalid) {
      if (newPasswordControl.errors?.['required']) {
        this.submitError = true;
        return 'Password baru wajib diisi';
      } else if (newPasswordControl.errors?.['minlength'] || newPasswordControl.errors?.['pattern']) {
        this.submitError = true;
        return 'Password harus minimal 8 karakter kombinasi huruf besar kecil dan angka';
      }
    } else if (this.data.newPassword !== this.data.confirmNewPassword) {
      this.submitError = true; // Tandai sebagai kesalahan
      return 'Data konfirmasi password tidak sama'; // Pesan kesalahan
    }

    if(!this.parrentMessage) {
      this.submitError = false;
    }

    return this.parrentMessage;
  }
}
