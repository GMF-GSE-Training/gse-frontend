import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../components/header/header.component";
import { InputTextComponent } from "../../../elements/input/input-text/input-text.component";
import { InputFileComponent } from "../../../elements/input/input-file/input-file.component";
import { WhiteButtonComponent } from '../../../elements/button/white-button/white-button.component';
import { BlueButtonComponent } from '../../../elements/button/blue-button/blue-button.component';

@Component({
  selector: 'app-view-sign',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    InputTextComponent,
    InputFileComponent,
    WhiteButtonComponent,
    BlueButtonComponent,
],
  templateUrl: './view-sign.component.html',
  styleUrl: './view-sign.component.css'
})
export class AddSignComponent {

}
