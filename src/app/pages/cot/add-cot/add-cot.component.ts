import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../components/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';

@Component({
  selector: 'app-add-cot',
  standalone: true,
  imports: [
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
],
  templateUrl: './add-cot.component.html',
  styleUrl: './add-cot.component.css'
})
export class AddCotComponent {

}
