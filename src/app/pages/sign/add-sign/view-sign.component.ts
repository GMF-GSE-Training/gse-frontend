import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { InputFileComponent } from "../../../component/input/input-file/input-file.component";
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../component/button/blue-button/blue-button.component';
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';

@Component({
  selector: 'app-view-sign',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    InputTextComponent,
    InputFileComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RoleBasedAccessDirective
],
  templateUrl: './view-sign.component.html',
  styleUrl: './view-sign.component.css'
})
export class AddSignComponent {

}
