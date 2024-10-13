import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FileInputComponent } from '../../components/input/file-input/file-input.component';
import { CompanyInputComponent } from '../../components/input/company-input/company-input.component';
import { WhiteButtonComponent } from '../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../components/button/blue-button/blue-button.component';
import { BaseInputComponent } from '../../components/input/base-input/base-input.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { TitleComponent } from '../../components/title/title.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-participant-form',
  standalone: true,
  imports: [
    FileInputComponent,
    CompanyInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    BaseInputComponent,
    HeaderComponent,
    RouterLink,
    FormsModule,
    TitleComponent
  ],
  templateUrl: './participant-form.component.html',
  styleUrl: './participant-form.component.css',
})
export class ParticipantFormComponent {
  @Input() pageTitle: string = '';
  @Input() participant: any = {};
  @Input() isUpdate: boolean = false;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() fileChange = new EventEmitter<{ property: string, file: File | null }>();

  @ViewChild(CompanyInputComponent) companyInputComponent!: CompanyInputComponent;
  @ViewChild('form') form!: NgForm;

  onSubmit() {
    if (this.form.valid) {
      this.participant.perusahaan = this.companyInputComponent.getCompanyName();
      if(this.isUpdate) {
        this.formSubmit.emit(this.participant);
      } else {
        this.formSubmit.emit(this.participant);
      }
    }
  }

  onFileChange(property: string, file: File | null): void {
    this.fileChange.emit({ property, file });
  }
}
