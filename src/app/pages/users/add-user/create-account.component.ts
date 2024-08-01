import { Component } from '@angular/core';
import { BlueButtonComponent } from "../../../component/button/blue-button/blue-button.component";
import { RouterLink } from '@angular/router';
import { WhiteButtonComponent } from '../../../component/button/white-button/white-button.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    BlueButtonComponent,
    RouterLink,
    WhiteButtonComponent
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class AddUserComponent {

}
