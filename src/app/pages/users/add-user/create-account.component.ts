import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { LoginRegisterComponent } from "../../../component/login-register/login-register.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RouterLink,
    WhiteButtonComponent,
    RoleBasedAccessDirective,
    LoginRegisterComponent,
    InputTextComponent
],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class AddUserComponent {

}
