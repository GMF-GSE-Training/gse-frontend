import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certificate-form',
  standalone: true,
  imports: [
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './certificate-form.component.html',
  styleUrl: './certificate-form.component.css'
})
export class CertificateFormComponent {
  @Input() pageTitle: string = '';
  @Input() certificate: any = {};

  @Output() formSubmit = new EventEmitter<any>();
  @Output() fileChange = new EventEmitter<{ property: string, file: File | null }>();

  @ViewChild('form') form!: NgForm;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.certificate);
    }
  }
}
