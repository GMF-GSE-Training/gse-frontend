import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "../../components/auth/auth.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-email-form',
  standalone: true,
  imports: [
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    CommonModule,
    AuthComponent,
    RouterLink,
],
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css', '../user-form/user-form.component.css']
})
export class EmailFormComponent {
  @Input() isSubmitted: boolean = false;
  @Input() submitError: boolean = false;
  @Input() data: { email: string } = {
    email: '',
  };
  @Input() parrentMessage: string = '';
  message: string = '';

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.data);
    } else {
      this.message = this.getMessage();  // Menampilkan pesan error di parent jika form tidak valid
    }
  }

  getMessage(): string {
    if (!this.form) return '';

    // Email
    const emailControl = this.form.controls['email'];
    if (emailControl?.invalid) {
      if (emailControl.errors?.['required']) {
        this.submitError = true;
        return 'Email wajib diisi';
      } else if (emailControl.errors?.['email']) {
        this.submitError = true;
        return 'Email tidak valid';
      }
    }

    if(!this.parrentMessage) {
      this.submitError = false;
    }

    return this.parrentMessage;
  }
}
