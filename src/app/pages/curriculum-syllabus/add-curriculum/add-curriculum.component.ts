import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { WhiteButtonComponent } from "../../../components/button/white-button/white-button.component";
import { BaseInputComponent } from '../../../components/input/base-input/base-input.component';

@Component({
  selector: 'app-add-curriculum',
  standalone: true,
  imports: [
    HeaderComponent,
    BaseInputComponent,
    WhiteButtonComponent,
  ],
  templateUrl: './add-curriculum.component.html',
  styleUrl: './add-curriculum.component.css'
})
export class AddCurriculumComponent {

}
