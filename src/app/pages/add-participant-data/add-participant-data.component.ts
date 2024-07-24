import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../component/white-button/white-button.component';
import { BlueButtonComponent } from '../../component/blue-button/blue-button.component';
import { InputFileComponent } from "../../component/input-file/input-file.component";
import { InputComponent } from "../../component/input/input.component";
import { InputDateComponent } from "../../component/input-date/input-date.component";

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent,
    WhiteButtonComponent,
    InputFileComponent,
    InputComponent,
    InputDateComponent
],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {

}
