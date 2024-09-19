import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { WhiteButtonComponent } from '../../../components/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../components/button/blue-button/blue-button.component';

@Component({
  selector: 'app-add-capability',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
  ],
  templateUrl: './add-capability.component.html',
  styleUrl: './add-capability.component.css'
})
export class AddCapabilityComponent {

}
