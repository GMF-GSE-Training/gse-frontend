import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-view-capability',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './view-capability.component.html',
  styleUrl: './view-capability.component.css'
})
export class ViewCapabilityComponent {

}
