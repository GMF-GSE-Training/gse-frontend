import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { BaseInputComponent } from "../../components/input/base-input/base-input.component";
import { WhiteButtonComponent } from "../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../components/button/blue-button/blue-button.component";
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthComponent } from "../../components/auth/auth.component";
import { TogglePasswordVisibilityComponent } from "../../components/toggle-password-visibility/toggle-password-visibility.component";
import { RoleInputComponent } from "../../components/input/role-input/role-input.component";

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    RouterLink,
    TitleComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    FormsModule,
    CommonModule,
    AuthComponent,
    TogglePasswordVisibilityComponent,
    RoleInputComponent
],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() pageTitle: string = '';
  @Input() user: any = {};
  @Input() isRegister: boolean = false;
  @Input() isCreateUser: boolean = false;
  @Input() isResetPassword: boolean = false;
  blueButtonLabel: string = '';
  @Input() isCreate: boolean = false;
  @Input() isUpdate: boolean = false;

  // role-input
  selectedRole: any = null;

  isPassVisible: boolean = false;
  passVisible() {
    this.isPassVisible = !this.isPassVisible;
  }

  @Output() formSubmit = new EventEmitter<any>();
  @ViewChild('form') form!: NgForm;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    if(this.router.url === '/register') {
      this.blueButtonLabel = 'Daftar';
    } else {
      this.blueButtonLabel = 'Simpan';
    }
    if(this.user.role) {
      this.onRoleChange(this.user.role);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.user);
    }
  }

  onRoleChange(role: { id: string, role: string }): void {
    this.selectedRole = role;
    this.user.roleId = role.id;
  }
}
