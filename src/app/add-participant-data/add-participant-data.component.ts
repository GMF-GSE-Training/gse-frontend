import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-participant-data',
  standalone: true,
  imports: [
    RouterLink,
    NavbarComponent
  ],
  templateUrl: './add-participant-data.component.html',
  styleUrl: './add-participant-data.component.css'
})
export class AddParticipantDataComponent {

}
