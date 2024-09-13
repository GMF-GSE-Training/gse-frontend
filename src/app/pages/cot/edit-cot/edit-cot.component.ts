import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header/header.component";
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { WhiteButtonComponent } from "../../../elements/button/white-button/white-button.component";
import { BlueButtonComponent } from "../../../elements/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { InputDateComponent } from "../../../elements/input/input-date/input-date.component";

@Component({
  selector: 'app-edit-cot',
  standalone: true,
  imports: [
    HeaderComponent,
    InputTextComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
    RouterLink,
    InputDateComponent,
],
  templateUrl: './edit-cot.component.html',
  styleUrl: './edit-cot.component.css'
})
export class EditCotComponent {

}
