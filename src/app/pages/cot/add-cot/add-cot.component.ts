import { Component } from '@angular/core';
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { InputDateComponent } from "../../../component/input/input-date/input-date.component";
import { RoleBasedAccessDirective } from '../../../shared/directive/role-based-access.directive';

@Component({
  selector: 'app-add-cot',
  standalone: true,
  imports: [
    NavbarComponent,
    InputTextComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
    InputDateComponent,
    RoleBasedAccessDirective
],
  templateUrl: './add-cot.component.html',
  styleUrl: './add-cot.component.css'
})
export class AddCotComponent {

}
