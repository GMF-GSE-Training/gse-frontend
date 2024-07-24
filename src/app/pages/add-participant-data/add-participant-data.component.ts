import { Component } from '@angular/core';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../component/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../component/button/blue-button/blue-button.component';
import { InputFileComponent } from "../../component/input/input-file/input-file.component";
import { InputTextComponent } from '../../component/input/input-text/input-text.component';
import { InputDateComponent } from "../../component/input/input-date/input-date.component";

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    InputFileComponent,
    InputTextComponent,
    InputDateComponent
],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {

}
