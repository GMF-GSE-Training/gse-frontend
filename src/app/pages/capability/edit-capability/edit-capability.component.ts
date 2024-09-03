import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-edit-capability',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    InputTextComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RoleBasedAccessDirective
  ],
  templateUrl: './edit-capability.component.html',
  styleUrl: './edit-capability.component.css'
})
export class EditCapabilityComponent {

}
