import { Component } from '@angular/core';
import { InputDateComponent } from "../../../component/input/input-date/input-date.component";
import { InputFileComponent } from "../../../component/input/input-file/input-file.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { InputCompanyComponent } from "../../../component/input/input-company/input-company.component";
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { RoleBasedAccessDirective } from '../../../directive/role-based-access.directive';

@Component({
  selector: 'app-edit-participant-data',
  standalone: true,
  imports: [
    InputDateComponent,
    InputFileComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    InputTextComponent,
    InputCompanyComponent,
    NavbarComponent,
    RouterLink,
    RoleBasedAccessDirective,
  ],
  templateUrl: './edit-participant-data.component.html',
  styleUrl: './edit-participant-data.component.css'
})
export class EditParticipantDataComponent {

}
