import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { InputRoleNikComponent } from "../../components/input/input-role-nik/input-role-nik.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "../../components/auth/auth.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    RouterLink,
    TitleComponent,
    BaseInputComponent,
    InputRoleNikComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    CommonModule,
    AuthComponent
],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() pageTitle: string = '';
  @Input() user: any = {};
  @Input() isRegister: boolean = false;
  @Input() isCreateUser: boolean = false;
  @Input() submitError: boolean = false;
  @Input() registerSuccess: boolean = false;
  @Input() registerMessage: string = '';
  message: string = '';
  isSubmitted: boolean = false;
  isNotRegisterPage: boolean = true;
  saveLabel: string = '';

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.router.url === '/register') {
      this.isNotRegisterPage = false;
      this.saveLabel = 'Register';
    } else {
      this.saveLabel = 'Save';
    }
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.formSubmit.emit(this.user);
    } else {
      this.message = this.getMessage();  // Menampilkan pesan error di parent jika form tidak valid
    }
  }

  onRoleIdChange(roleId: string): void {
    this.user.roleId = roleId;
  }

  onNikChange(nik: string): void {
    this.user.nik = nik;
  }

  getMessage(): string {
    if (!this.form) return '';

    // NIK
    const nikControl = this.form.controls['nik'];
    if (nikControl?.invalid) {
      if (nikControl.errors?.['required']) {
        this.submitError = true;
        this.registerSuccess = false;
        console.log(this.registerSuccess);
        console.log(this.submitError);
        return 'NIK wajib diisi';
      } else if (nikControl.errors?.['minlength'] || nikControl.errors?.['maxlength']) {
        this.registerSuccess = false;
        this.submitError = true;
        console.log(this.registerSuccess);
        console.log(this.submitError);
        return 'NIK harus berjumlah 16 karakter';
      }
    }

    // Name
    const nameControl = this.form.controls['name'];
    if (nameControl?.invalid) {
      if (nameControl.errors?.['required']) {
        this.registerSuccess = false;
        this.submitError = true;
        return 'Nama wajib diisi';
      } else if (nameControl.errors?.['pattern']) {
        this.registerSuccess = false;
        this.submitError = true;
        return 'Nama hanya boleh berisi huruf';
      }
    }

    // Email
    const emailControl = this.form.controls['email'];
    if (emailControl?.invalid) {
      if (emailControl.errors?.['required']) {
        this.registerSuccess = false;
        this.submitError = true;
        return 'Email wajib diisi';
      } else if (emailControl.errors?.['email']) {
        this.registerSuccess = false;
        this.submitError = true;
        return 'Email tidak valid';
      }
    }

    // Password
    const passwordControl = this.form.controls['password'];
    if (passwordControl?.invalid) {
      if (passwordControl.errors?.['required']) {
        this.registerSuccess = false;
        this.submitError = true;
        return 'Password wajib diisi';
      } else if (passwordControl.errors?.['minlength']) {
        this.registerSuccess = false;
        this.submitError = true;
        return 'Password harus minimal 8 karakter kombinasi huruf besar kecil dan angka';
      }
    }

    this.submitError = false;
    this.registerSuccess = true;

    return this.registerMessage || '';
  }
}
