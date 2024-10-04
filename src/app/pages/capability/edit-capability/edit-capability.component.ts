import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';
import { TitleComponent } from "../../../components/title/title.component";

@Component({
  selector: 'app-edit-capability',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    TitleComponent
],
  templateUrl: './edit-capability.component.html',
  styleUrl: './edit-capability.component.css'
})
export class EditCapabilityComponent {

}
