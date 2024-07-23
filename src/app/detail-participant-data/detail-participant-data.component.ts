import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { BlueButtonComponent } from "../component/blue-button/blue-button.component";

@Component({
  selector: 'app-detail-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent,
    BlueButtonComponent
],
  templateUrl: './detail-participant-data.component.html',
  styleUrl: './detail-participant-data.component.css'
})
export class DetailParticipantDataComponent {

}
