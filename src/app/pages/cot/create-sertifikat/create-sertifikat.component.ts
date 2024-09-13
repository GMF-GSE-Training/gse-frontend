import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { InputDateComponent } from "../../../elements/input/input-date/input-date.component";
import { WhiteButtonComponent } from "../../../elements/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../elements/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-sertifikat',
  standalone: true,
  imports: [
    HeaderComponent,
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
