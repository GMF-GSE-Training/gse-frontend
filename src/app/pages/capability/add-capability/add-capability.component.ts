import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../elements/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../elements/button/blue-button/blue-button.component";

@Component({
  selector: 'app-add-capability',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    InputTextComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
  ],
  templateUrl: './add-capability.component.html',
  styleUrl: './add-capability.component.css'
})
export class AddCapabilityComponent {

}
