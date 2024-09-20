import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { InputRoleNikComponent } from "../../components/input/input-role-nik/input-role-nik.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    TitleComponent,
    BaseInputComponent,
    InputRoleNikComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() pageTitle: string = '';
  @Input() user: any = {};

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.user);
    }
  }

  onRoleIdChange(roleId: string): void {
    this.user.roleId = roleId;
  }

  onNikChange(nik: string): void {
    this.user.nik = nik;
  }
}
