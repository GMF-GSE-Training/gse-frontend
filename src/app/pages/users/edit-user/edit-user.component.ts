import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    RouterLink,
    BlueButtonComponent,
    WhiteButtonComponent
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

}
