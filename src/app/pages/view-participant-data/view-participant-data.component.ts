import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';
import { WhiteButtonComponent } from '../../component/white-button/white-button.component';
import { BlueButtonComponent } from '../../component/blue-button/blue-button.component';

@Component({
  selector: 'app-view-participant-data',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    WhiteButtonComponent,
    BlueButtonComponent
],
  templateUrl: './view-participant-data.component.html',
  styleUrl: './view-participant-data.component.css'
})
export class ViewParticipantDataComponent {

}
