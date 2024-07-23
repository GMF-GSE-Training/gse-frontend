import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';
import { BlueButtonComponent } from "../component/blue-button/blue-button.component";

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent
],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {

}
