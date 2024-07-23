import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-detail-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './detail-participant-data.component.html',
  styleUrl: './detail-participant-data.component.css'
})
export class DetailParticipantDataComponent {

}
