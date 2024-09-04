import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    RouterLink,
    BlueButtonComponent,
    WhiteButtonComponent,
    RoleBasedAccessDirective,
    InputTextComponent
],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

}
