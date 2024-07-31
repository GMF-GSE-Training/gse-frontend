import { Component } from '@angular/core';
import { NavbarComponent } from "../../../component/navbar/navbar.component";
import { InputTextComponent } from "../../../component/input/input-text/input-text.component";
import { InputDateComponent } from "../../../component/input/input-date/input-date.component";
import { WhiteButtonComponent } from "../../../component/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-sertifikat',
  standalone: true,
  imports: [
    NavbarComponent,
    InputTextComponent,
    InputDateComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
  ],
  templateUrl: './create-sertifikat.component.html',
  styleUrl: './create-sertifikat.component.css'
})
export class CreateSertifikatComponent {

}
